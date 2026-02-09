const mongoose = require("mongoose");

const BlockSchema = new mongoose.Schema(
  {
    index: Number,
    timestamp: String,
    data: mongoose.Schema.Types.Mixed,
    previousHash: String,
    hash: String,
  },
  { _id: false }
);

const BlockchainSchema = new mongoose.Schema({
  chain: [BlockSchema],
});

module.exports = mongoose.model("Blockchain", BlockchainSchema);
