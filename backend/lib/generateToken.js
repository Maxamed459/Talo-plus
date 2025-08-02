import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";

export const generateToken = (userId, expiresIn) => {
  const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn });
  return token;
};
