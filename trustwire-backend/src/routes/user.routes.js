const express = require("express");
const User = require("../models/User.model");

const router = express.Router();

/**
 * Create user (wallet)
 */
router.post("/create", async (req, res) => {
  const { name, balance } = req.body;

  if (!name) {
    return res.status(400).json({ message: "User name required" });
  }

  const existing = await User.findOne({ name });
  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    balance: balance || 0
  });

  res.json(user);
});

/**
 * Get all users
 */
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
