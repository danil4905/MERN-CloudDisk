const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; // take token
    if (!token) {
      return res.status(401).json({ message: "Auth error" });
    }
    const decoded = jwt.verify(token, config.get("secretKey")); // verify token
    req.user = decoded;
    next(); // next middleware
  } catch (error) {
    return res.status(401).json({ message: "Auth error" });
  }
};
