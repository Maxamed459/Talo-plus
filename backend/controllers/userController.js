import { generateToken } from "../lib/generateToken.js";
import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID } from "../config/config.js";

export const signUp = async (req, res) => {
  try {
    const { fullname, username, email, password, profilePic, role } = req.body;

    const isUserExists = await User.findOne({
      $or: [
        { username: username.toLowerCase() },
        { email: email.toLowerCase() },
      ],
    });

    if (isUserExists) {
      return res.status(400).json({
        success: false,
        message: "username or email already exists",
      });
    }
    const newUser = new User({
      fullname,
      username,
      email,
      password,
      profilePic,
      role,
    });

    await newUser.save();
    const expiresIn = 7 * 24 * 60 * 60; // 7days

    const token = generateToken(newUser._id, expiresIn);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: expiresIn * 1000, // 7days to milliseconds
    });
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      newUser,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User does not exist with this email",
      });
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "incorrect password",
      });
    }

    const expiresIn = 7 * 24 * 60 * 60; // 7days

    const token = generateToken(user._id, expiresIn);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: expiresIn * 1000,
    });
    user.password = undefined;
    res.status(200).json({
      success: true,
      message: "login successfully",
      user,
      expiresIn,
    });
  } catch (error) {
    console.log("Error at: ", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });
    res.status(200).json({
      success: true,
      message: "logged out successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const client = new OAuth2Client(GOOGLE_CLIENT_ID);

export const googleSignIn = async (req, res) => {
  try {
    const { credential } = req.body; // sent from frontend

    // Verify token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        fullname: name,
        email,
        username: email.split("@")[0],
        profilePic: picture,
        password: sub, // dummy password or random string
        role: "user",
      });
    }

    // Generate your app's JWT
    const expiresIn = 7 * 24 * 60 * 60; // 7days
    const token = generateToken(user._id, expiresIn);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set to true in production with HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      user,
      message: "Google login successful",
    });
  } catch (error) {
    console.error("Google sign-in error:", error);
    res
      .status(500)
      .json({ success: false, message: "Invalid token or error occurred" });
  }
};
