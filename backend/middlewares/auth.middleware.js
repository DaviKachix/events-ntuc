const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "No token" });
  }

  try {
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, "SECRET_KEY");

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};