module.exports = (req, res, next) => {
  if (req.headers) {
    next();
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
