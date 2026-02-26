import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import Resume from "../models/Resume.js";

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

//Controller for User Registration
//POST: /api/users/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Check if required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing Required Fields!" });
    }

    //Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User Already Exists!" });
    }

    //Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    //Return success message
    const token = generateToken(newUser._id);
    newUser.password = undefined;

    return res.status(201).json({
      message: "User created successfully!",
      token: token,
      user: newUser,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Controller for User Login
//POST: /api/users/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Check if user already exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Invalid E-Mail or Password!" });
    }

    //Check if password is correct
    if (!user.comparePassword(password)) {
      return res.status(400).json({ message: "Invalid E-Mail or Password!" });
    }

    //Return success message
    const token = generateToken(newUser._id);
    user.password = undefined;

    return res.status(200).json({
      message: "Login Successful!",
      token: token,
      user: user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Controller for Getting User by ID
//GET: /api/users/login
export const getUserById = async (req, res) => {
  try {
    const userId = req.userId;

    //Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //Return user
    user.password = undefined;
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//Controller for Getting User Resumés
//GET: /api/users/resumes
export const getUserResumes = async (req, res) => {
  try {
    const userId = req.userId;

    //Return User Resumés
    const resumes = await Resume.find({ userId: userId });
    return res.status(200).json({ resumes: resumes });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
