const express = require("express");
const Blockchain = require("../blockchain/Blockchain");
const User = require("../models/User.model");

const router = express.Router();
const financeChain = new Blockchain();

/**
 * Initialize blockchain from DB
 */
(async () => {
  await financeChain.init();
})();

/**
 * Get full blockchain (read-only)
 */
router.get("/test", async (req, res) => {
  res.json({
    message: "Persistent Blockchain Running",
    chainLength: financeChain.chain.length,
    isValid: financeChain.isChainValid(),
    chain: financeChain.chain,
  });
});

/**
 * Add transaction (HARDENED)
 */
router.post("/add", async (req, res) => {
  try {
    const { from, to, amount } = req.body;

    /* ---------- Basic validation ---------- */
    if (!from || !to || typeof amount !== "number" || amount <= 0) {
      return res.status(400).json({ message: "Invalid transaction data" });
    }

    if (from === to) {
      return res.status(400).json({ message: "Sender and receiver must differ" });
    }

    /* ---------- Blockchain integrity check ---------- */
    if (!financeChain.isChainValid()) {
      return res.status(500).json({
        message: "Blockchain integrity compromised. Transaction rejected.",
      });
    }

    /* ---------- Atomic balance update ---------- */
    const sender = await User.findOneAndUpdate(
      { name: from, balance: { $gte: amount } },
      { $inc: { balance: -amount } },
      { new: true }
    );

    if (!sender) {
      return res.status(400).json({ message: "Insufficient balance or sender not found" });
    }

    const receiver = await User.findOneAndUpdate(
      { name: to },
      { $inc: { balance: amount } },
      { new: true }
    );

    if (!receiver) {
      // rollback sender if receiver missing
      await User.updateOne({ name: from }, { $inc: { balance: amount } });
      return res.status(400).json({ message: "Receiver not found" });
    }

    /* ---------- Add block to blockchain ---------- */
    const block = await financeChain.addBlock({
      from,
      to,
      amount,
      timestamp: new Date().toISOString(),
    });

    res.json({
      message: "Transaction completed securely",
      block,
      balances: {
        from: sender.balance,
        to: receiver.balance,
      },
    });
  } catch (err) {
    console.error("Transaction error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
