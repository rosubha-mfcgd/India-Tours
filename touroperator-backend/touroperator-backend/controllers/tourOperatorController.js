const User = require("../models/User");
const {gridFsStorageForTours} = require("../middleware/upload");



// Admin creates Tour Operator (roleID = 2)

// Helper function to generate username
function generateUsername(firstName, lastName) {
  let fn = (firstName || "").toLowerCase();
  let ln = (lastName || "").toLowerCase();

  // Take first 2 characters or pad with numbers
  let fnPart = fn.substring(0, 2);
  let lnPart = ln.substring(0, 2);

  // Fill missing characters with numbers to reach 4 letters
  while (fnPart.length < 2) fnPart += Math.floor(Math.random() * 10);
  while (lnPart.length < 2) lnPart += Math.floor(Math.random() * 10);

  // Combine parts
  let baseUsername = fnPart + lnPart;

  // Add random digits if needed to make total length 6
  while (baseUsername.length < 6) {
    baseUsername += Math.floor(Math.random() * 10);
  }

  return baseUsername;
}

exports.createTourOperator = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Enforce role creation rule
    const ROLE_TOUR_OPERATOR = 2;

    // Generate unique username
    let username = generateUsername(firstName, lastName);

    // Ensure username is unique in DB
    let exists = await User.findOne({ username });
    let attempt = 0;
    while (exists && attempt < 10) {
      username = generateUsername(firstName, lastName);
      exists = await User.findOne({ username });
      attempt++;
    }
    if (exists) {
      return res.status(400).json({ message: "Failed to generate unique username" });
    }

    const newUser = new User({
      firstName,
      lastName,
      username,
      password,
      email,
      roleID: ROLE_TOUR_OPERATOR,
    });

    await newUser.save();

    res.status(201).json({
      message: "Tour Operator created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        roleID: newUser.roleID,
      },
    });
  } catch (err) {
    console.error("Create Tour Operator Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
/**
 * GET ALL TOUR OPERATORS
 * Admin only
 */
exports.getAllTourOperators = async (req, res) => {
  try {
    const operators = await User.find({ roleID: 2 }).select("-password");
    res.json(operators);
  } catch (err) {
    console.error("Get Tour Operators Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * UPDATE TOUR OPERATOR (EMAIL / PASSWORD)
 * Admin only
 */
exports.updateTourOperator = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password } = req.body;

    const operator = await User.findOne({ _id: id, roleID: 2 });
    if (!operator) {
      return res.status(404).json({ message: "Tour Operator not found" });
    }

    if (email) operator.email = email;
    if (password) operator.password = password; // auto-hashed by pre-save hook

    await operator.save();

    res.json({
      message: "Tour Operator updated successfully",
      operator: {
        id: operator._id,
        username: operator.username,
        email: operator.email,
        roleID: operator.roleID,
      },
    });
  } catch (err) {
    console.error("Update Tour Operator Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * DELETE TOUR OPERATOR
 * ADMIN ONLY
 */
exports.deleteTourOperator = async (req, res) => {
  try {
    const { id } = req.params;

    const operator = await User.findOneAndDelete({
      _id: id,
      roleID: 2,
    });

    if (!operator) {
      return res.status(404).json({ message: "Tour Operator not found" });
    }

    res.json({ message: "Tour Operator deleted successfully" });
  } catch (err) {
    console.error("Delete Tour Operator Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
