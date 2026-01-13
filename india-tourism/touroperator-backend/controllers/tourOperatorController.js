const User = require("../models/User");
const {gridFsStorageForTours} = require("../middleware/upload");
const getNextSequence = require("../utility/getNextSequence");


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
    const {
      firstName,
      lastName,
      email,
      password,
      phones = [], // optional
    } = req.body;

    if (!firstName || !lastName || !password) {
      return res.status(400).json({
        message: "First name, last name, and password are required",
      });
    }

    const ROLE_TOUR_OPERATOR = 2;

    /* ---------------- Generate numeric user _id ---------------- */
    const numericUserId = await getNextSequence("user");

    if (numericUserId === undefined || numericUserId === null) {
      return res.status(500).json({
        message: "Failed to generate user ID",
      });
    }

    /* ---------------- Generate unique username ---------------- */
    let username = generateUsername(firstName, lastName);
    let exists = await User.findOne({ username });
    let attempt = 0;

    while (exists && attempt < 10) {
      username = generateUsername(firstName, lastName);
      exists = await User.findOne({ username });
      attempt++;
    }

    if (exists) {
      return res.status(400).json({
        message: "Failed to generate unique username",
      });
    }

    /* ---------------- Prepare phones ---------------- */
    let primaryPhoneCount = 0;
    const preparedPhones = [];

    for (const phone of phones) {
      if (!phone.number) {
        return res
          .status(400)
          .json({ message: "Phone number is required" });
      }

      if (phone.isPrimary) primaryPhoneCount++;

      const phoneId = await getNextSequence("phone");

      preparedPhones.push({
        _id: phoneId,
        number: phone.number,
        type: phone.type || "mobile",
        isPrimary: !!phone.isPrimary,
      });
    }

    if (primaryPhoneCount > 1) {
      return res
        .status(400)
        .json({ message: "Only one primary phone is allowed" });
    }

    /* ---------------- Create tour operator ---------------- */
    const newUser = new User({
      _id: numericUserId,
      firstName,
      lastName,
      username,
      password, // hashed by pre-save hook
      email,
      roleID: ROLE_TOUR_OPERATOR,
      phones: preparedPhones,
    });

    await newUser.save();

    /* ---------------- Response ---------------- */
    res.status(201).json({
      message: "Tour Operator created successfully",
      user: {
        _id: newUser._id, // numeric
        username: newUser.username,
        roleID: newUser.roleID,
        phones: newUser.phones,
      },
    });
  } catch (err) {
    console.error("Create Tour Operator Error:", err);
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET ALL TOUR OPERATORS
 * Admin only
 */
// Role mapping
const ROLE_MAP = {
  1: "SuperAdmin",
  2: "Tour Operator",
  3: "User",
};

exports.getAllTourOperators = async (req, res) => {
  try {
    const operators = await User.find({ roleID: 2 }).select("-password");

    const response = operators.map(user => ({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      phones: user.phones || [], // NEW: include phones
      role: ROLE_MAP[user.roleID] || "Unknown",
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));

    res.status(200).json(response);
  } catch (err) {
    console.error("Get Tour Operators Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
/**
 * UPDATE TOUR OPERATOR (EMAIL / PASSWORD / PHONE NUMBER)
 * Admin only
 */
exports.updateTourOperator = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, password, phones } = req.body;

    /* ---------------- Find tour operator ---------------- */
    const operator = await User.findOne({ _id: id, roleID: 2 });
    if (!operator) {
      return res.status(404).json({ message: "Tour Operator not found" });
    }

    /* ---------------- Update email / password ---------------- */
    if (email) operator.email = email;
    if (password) operator.password = password; // auto-hashed by pre-save hook

    /* ---------------- Update phones (optional) ---------------- */
    if (Array.isArray(phones)) {
      let primaryPhoneCount = 0;
      const preparedPhones = [];

      for (const phone of phones) {
        if (!phone.number) {
          return res
            .status(400)
            .json({ message: "Phone number is required" });
        }

        if (phone.isPrimary) primaryPhoneCount++;

        const phoneId =
          phone._id !== undefined && phone._id !== null
            ? phone._id // keep existing numeric id if provided
            : await getNextSequence("phone");

        preparedPhones.push({
          _id: phoneId,
          number: phone.number,
          type: phone.type || "mobile",
          isPrimary: !!phone.isPrimary,
        });
      }

      if (primaryPhoneCount > 1) {
        return res
          .status(400)
          .json({ message: "Only one primary phone is allowed" });
      }

      operator.phones = preparedPhones;
    }

    /* ---------------- Save ---------------- */
    await operator.save();

    /* ---------------- Response ---------------- */
    res.json({
      message: "Tour Operator updated successfully",
      operator: {
        id: operator._id,
        username: operator.username,
        email: operator.email,
        roleID: operator.roleID,
        phones: operator.phones || [],
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
