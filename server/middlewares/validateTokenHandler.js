const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const verifyToken = asyncHandler(async (req, res, next) => {
  let token = req.headers['Authorization'] || req.headers['authorization'] || req.body.token
    || req.query.token ||
    req.headers["x-access-token"];


  if (!token || !token.startsWith('Bearer')) {
    return res.status(401).json({ status: false, message: "User is not authorized or token is missing" });
  }
  token = token.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decoded.user.role === "Admin") {
      next();
    } else {
      return res.status(403).json({
        status: false,
        message: "Access Denied! You are not an Admin"
      });
    }
  } catch (err) {
    return res.status(401).json({ status: false, message: "Invalid Token" });
  }
});

const verifyReceptionToken = asyncHandler(async (req, res, next) => {
  let token = req.headers['Authorization'] || req.headers['authorization'] || req.body.token
    || req.query.token ||
    req.headers["x-access-token"];

  if (!token || !token.startsWith('Bearer')) {
    return res.status(401).json({ status: false, message: "User is not authorized or token is missing" });
  }
  token = token.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded.user; // Set req.user with decoded user information
    if (req.user.role === "Receptionist" || req.user.role === "Admin") {
      next();
    } else {
      return res.status(403).json({
        status: false,
        message: "Access Denied! You are not the Receptionist or Admin"
      });
    }
  } catch (err) {
    return res.status(401).json({ status: false, message: "Invalid Token" });
  }
});


module.exports = { verifyToken, verifyReceptionToken };



