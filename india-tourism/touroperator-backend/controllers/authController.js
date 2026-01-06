// Create super admin (no login required)
const User = require("../models/User");
const Token = require("../models/Token");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const getNextSequence = require("../utility/getNextSequence");
require("dotenv").config();

// Register
exports.register = async (req, res) => {
  try {
    const { username, password, email, roleID, firstName, lastName } = req.body;

    // ---------------- Validations
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    if (!firstName || !lastName) {
      return res.status(400).json({ message: "First name and last name are required" });
    }

    if (!roleID) {
      return res.status(400).json({ message: "Role ID is required" });
    }

    // ---------------- Check existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ---------------- Generate numeric user _id
    const numericUserId = await getNextSequence("user");
    if (!numericUserId && numericUserId !== 0) {
      return res.status(500).json({ message: "Failed to generate user ID" });
    }

    // ---------------- Create user
    const user = new User({
      _id: numericUserId,
      username,
      firstName,
      lastName,
      password, // hashed by pre-save hook
      email,
      roleID,
    });

    await user.save();

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        roleID: user.roleID,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    //  Find user
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    //  Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Token expiry
    const expiresInMinutes = parseInt(process.env.JWT_EXPIRES_IN) || 60; // default 60 min
    const expiresInMs = expiresInMinutes * 60 * 1000;

    //  Generate JWT
    const token = jwt.sign({ id: user._id, roleID: user.roleID }, process.env.JWT_SECRET, { expiresIn: `${expiresInMinutes}m` });
    const tokenId = await getNextSequence("token");
    // Save token in DB
    const now = new Date();
    const expiryDate = new Date(now.getTime() + expiresInMs);
    const tokenDoc = new Token({
      _id: tokenId,
      userId: user._id,
      token,
      startTime: now,
      expiresIn: expiryDate,
    });
    await tokenDoc.save();

    // Set HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
      maxAge: expiresInMs,
    });

    // Return user info (without token)
    res.json({
      message: "Login successful",
      user: { id: user._id, username: user.username, roleID: user.roleID },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// Logout - delete token
// Make sure you have cookie-parser installed and used in your app
// app.use(cookieParser());

exports.logout = async (req, res) => {
  try {
    // Read token from cookie
    const token = req.cookies?.token;

    if (!token) return res.status(400).json({ message: "No token provided" });

    // Remove token from database
    await Token.findOneAndDelete({ token });

    // Clear cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    });

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
    // 1️⃣ Check if super admin already exists
    const existingAdmin = await User.findOne({ roleID: 1 });
    if (existingAdmin) {
      return res.status(400).json({ message: "Super admin already exists" });
    }

    const { username, password, email, roleID, firstName, lastName } = req.body;

    if (!username || !password || !roleID || !firstName || !lastName) {
      return res.status(400).json({
        message: "Username, password, roleID, firstName, and lastName are required",
      });
    }

    // 2️⃣ Generate numeric user _id
    const numericUserId = await getNextSequence("user");

    if (!numericUserId && numericUserId !== 0) {
      return res.status(500).json({
        message: "Failed to generate user ID",
      });
    }

    console.log("Generated user numericId:", numericUserId);

    // 3️⃣ Create user with numeric _id
    const superAdmin = new User({
      _id: numericUserId,
      username,
      firstName,
      lastName,
      password, // will be hashed by pre-save hook
      email,
      roleID,
    });

    await superAdmin.save();

    res.status(201).json({
      message: "Super admin created successfully",
      user: {
        _id: superAdmin._id,
        username: superAdmin.username,
        email: superAdmin.email,
        roleID: superAdmin.roleID,
      },
    });
  } catch (err) {
    console.error("Create super admin error:", err);
    res.status(500).json({ message: err.message });
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