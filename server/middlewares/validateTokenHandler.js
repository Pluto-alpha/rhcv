const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const verifyToken = asyncHandler(async (req, res, next) => {
  let token =
    req.cookies.token || req.body.token || req.query.token ||
    req.headers["x-access-token"] ||
    req.headers['authorization'] ||
    req.headers['Authorization'];

  if (!token) {
    return res.status(401).json({ message: "User is not authorized or token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decoded.user.role === "Admin") {
      next();
    } else {
      return res.status(403).json({
        message: "Access Denied! You are not an Admin"
      });
    }
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
});

const verifyReceptionToken = asyncHandler(async (req, res, next) => {
  let token =
    req.cookies.token || req.body.token || req.query.token ||
    req.headers["x-access-token"] ||
    req.headers['authorization'] ||
    req.headers['Authorization'];

  if (!token) {
    return res.status(401).json({ message: "User is not authorized or token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.user; // Set req.user with decoded user information
    if (req.user.role === "Receptionist" || req.user.role === "Admin") {
      next();
    } else {
      return res.status(403).json({
        message: "Access Denied! You are not the Receptionist or Admin"
      });
    }
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
});


module.exports = { verifyToken, verifyReceptionToken };



