import { generateToken } from "../lib/generateToken.js";
import User from "../models/User.js";

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

    console.log(newUser);
    await newUser.save();
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
