const jwt = require("jsonwebtoken");

const ensureAuthorized = async (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Token is required",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};

module.exports = ensureAuthorized;
