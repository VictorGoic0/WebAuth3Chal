const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

module.exports = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    jwt.verify(token, secret, (error, decodedToken) => {
      if (error) {
        res.status(401).json({ message: "Invalid token." });
      } else {
        req.headers.department = decodedToken.department;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "No token provided, invalid request." });
  }
};
