const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Input validation
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      password,
      role,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User Registered Successfully", user: newUser });

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Send response with token
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000,
      })
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login Request - Email:", email);

    // Input validation
    if (!email || !password) {
      console.log("Email or password is missing");
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: "Invalid email or password" });
    }

    console.log("User found:", user.username);
    console.log("Comparing Passwords - Input:", password);
    console.log("Stored Hash:", user.password);

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Is Password Valid:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Invalid password for user:", user.username);
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Send response with token
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login successful",
        user: { id: user._id, username: user.username },
      });

    console.log("Login successful for user:", user.username);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: error.message }); // Changed to 500 for unexpected errors
  }
};

// Authentication Middleware
const authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update User
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({ message: "Record Updated Successfully", user: updatedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Record Deleted Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Logout User
const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Logout successful" });
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  authenticate,
  logoutUser,
};
