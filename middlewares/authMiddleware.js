const jwt = require("jsonwebtoken");
const SECRET_KEY = "q8$hX2mP!a7LzR@9vB&dF#C5K";


const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ success: false, message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY);
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: "Invalid token" });
  }
};

module.exports = authMiddleware;
