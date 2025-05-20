const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
module.exports = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("id role");
     // fresh data
    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = { id: user._id, role: user.role };
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};
