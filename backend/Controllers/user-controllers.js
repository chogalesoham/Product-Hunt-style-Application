const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../Models/user-model");

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if all fields are filled
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "User registration successful",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if all fields are filled
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find user by email
    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found with this email",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { _id: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      success: true,
      message: "User login successful",
      token,
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { registerUser, loginUser };
