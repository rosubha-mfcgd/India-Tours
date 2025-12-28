// Create super admin (no login required)
const User = require("../models/User");
const Token = require("../models/Token");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Register
exports.register = async (req, res) => {
  try {
    const { username, firstName , lastName , password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: "User already exists" });
    if (!username || !password) return res.status(400).json({ message: "Username and password are required" });
    if(!firstName  || !lastName) return res.status(400).json({ message: "First name and Last name are required" });
    const saltPassword = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, saltPassword);
    const user = new User({ username, firstName, lastName, password });
    await user.save();
    
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    // Set token expiry in seconds (e.g., 1 hour = 3600s)
    const expiresInSec = parseInt(process.env.JWT_EXPIRES_IN) * 60 * 1000;
    console.log('expiresInSec : ', expiresInSec);
    const token = jwt.sign({ id: user._id, roleID: user.roleID }, process.env.JWT_SECRET, { expiresIn: expiresInSec });
     // Save token in backend
    const now = new Date();
    const expiryDate = new Date(now.getTime() + expiresInSec); // 1 hour later
    const tokenDoc = new Token({
      userId: user._id,
      token,
      startTime: now,
      expiresIn: expiryDate,
    });
    await tokenDoc.save();
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Logout - delete token
exports.logout = async (req, res) => {
  try {
    const token = req.token; // retrieved from authMiddleware

    if (!token) return res.status(400).json({ message: "No token provided" });

    await Token.findOneAndDelete({ token });
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Forgot Username
exports.forgotUsername = async (req, res) => {
  try {
    const { email } = req.body; 
    // If you have email stored in user schema, you can use that
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "No user found with this email" });

    // Normally, you would send email here
    res.json({ message: `Username for the account is: ${user.username}` });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Forgot Password (generate token)
exports.forgotPassword = async (req, res) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Create reset token
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save();

    // Normally, send this token via email
    res.json({ message: "Password reset token generated", resetToken });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Reset Password (using token)
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token) return res.status(400).json({ message: "Token is required" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    res.json({ message: "Password has been reset successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
// Create Super Admin (no auth required)
/*
http://localhost:5000/api/auth/create-superadmin
{
  "username": "superadmin",
  "password": "SuperSecurePassword123!",
  "email": "admin@example.com",
  "roleID": 1
}

*/
exports.createSuperAdmin = async (req, res) => {
  try {
    // Check if super admin already exists
    const existingAdmin = await User.findOne({ roleID: 1 });
    console.log('existingAdmin:', existingAdmin);
    if (existingAdmin) {
      return res.status(400).json({ message: "Super admin already exists" });
    }

    const { username, password, email , roleID } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const superAdmin = new User({
      username,
      password,
      email,
      roleID
    });

    await superAdmin.save();
    res.status(201).json({ message: "Super admin created successfully", user: superAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


// Get logged-in user details
exports.getUserDetails = async (req, res) => {
  try {
    const user = req.user;

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      roleID: user.roleID
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};