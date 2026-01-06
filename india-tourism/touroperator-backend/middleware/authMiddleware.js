const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

/**
 * Authenticate token:
 * - Reads Bearer token from Authorization header
 * - Verifies token
 * - Extracts user ID from token and attaches it to req.userId
 * - Optionally fetches the full user object and attaches to req.user
 */
exports.authenticate = async (req, res, next) => {
  // 1. Try to read token from header
  let token;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  // 2. If no header token, try cookie
  if (!token && req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: "Unauthorized: user not found" });

    req.user = user;
    req.userId = decoded.id;
    req.token = token;

    next();
  } catch (err) {
    console.error("Authentication error:", err);
    return res.status(401).json({ message: "Invalid token" });
  }
};


/**
 * Authorize roles directly from Bearer token or cookie
 * @param  {...number} allowedRoles - List of roleIDs allowed for this route
 */
exports.authorizeRole = (...allowedRoles) => {
  return async (req, res, next) => {
    let token;

    //  Try to get token from Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    //  If no header token, try HTTP-only cookie
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: no token provided" });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;

      // Fetch user from DB
      const user = await User.findById(userId);
      if (!user) return res.status(401).json({ message: "Unauthorized: user not found" });
      
      // Check role
      if (!allowedRoles.includes(user.roleID)) {
        return res.status(403).json({ message: "Forbidden: insufficient permissions" });
      }

      // Attach user info to request
      req.user = user;
      req.userId = userId;
      req.token = token;

      next();
    } catch (err) {
      console.error("Role authorization error:", err);
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};
