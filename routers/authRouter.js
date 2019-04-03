const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../data/helpers/user-model.js");

router.post("/register", async (req, res) => {
  let { username, password, department } = req.body;
  if (!username || !password || !department) {
    res.status(401).json({ message: "Please enter valid credentials." });
  } else {
    password = bcrypt.hashSync(password, 8);
    try {
      const newUser = await db.create({ username, password, department });
      if (newUser) {
        res.status(201).json(newUser);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: `Your user could not be created ${error}.` });
    }
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(401).json({ message: "Please enter valid credentials." });
  } else {
    try {
      const user = await db.findByUser(username);
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(201).json({ message: `Welcome ${username}!` });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    } catch (error) {
      res.status(500).json({ message: `Login failed ${error}.` });
    }
  }
});

router.get("/logout", (req, res) => {});

module.exports = router;
