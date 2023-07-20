import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { getUsername } from "../utils/authUtils.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        if (await bcrypt.compare(req.body.password, oldUser.password)) {
          const { password, __v, _id, ...others } = oldUser._doc;
          req.session.user = others;
          res.status(200).json({ data: others });
        } else {
          res.status(400).json({
            message: "Incorrect password",
          });
        }
      } else {
        res.status(400).json({
          message: "User not found. Please sign up",
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    console.log(error);
  }
};

export const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const oldUser = await User.findOne({ email });
      if (!oldUser) {
        const hashedPassword = await bcrypt.hash(req.body.password, 8);
        const username = getUsername(email);
        const newUser = await User.create({
          email,
          password: hashedPassword,
          username,
          email_verified: false,
        });
        const { password, __v, _id, ...others } = newUser._doc;
        req.session.user = others;
        res.status(200).json({
          data: others,
        });
      } else {
        res.status(409).json({
          message: `User already exist with ${email}`,
        });
      }
    } else {
      res.status(400).json({
        message: "Invalid Credentials",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    console.log(error);
  }
};

export const logOutController = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: "Internal server error",
        });
      }
    });
    res.clearCookie("connect.sid");
    res.status(200).json({ message: "user logged out successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
