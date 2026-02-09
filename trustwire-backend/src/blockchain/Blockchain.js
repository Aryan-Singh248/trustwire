const crypto = require("crypto");
const BlockchainModel = require("../models/Blockchain.model");

class Blockchain {
  constructor() {
    this.chain = [];
  }

  /**
   * Calculate hash WITHOUT relying on class methods
   */
  static calculateHash(block) {
    return crypto
      .createHash("sha256")
      .update(
        block.index +
          block.timestamp +
          JSON.stringify(block.data) +
          block.previousHash
      )
      .digest("hex");
  }

  /**
   * Initialize blockchain from DB or create genesis block
   */
  async init() {
    let storedChain = await BlockchainModel.findOne();

    if (!storedChain) {
      const genesisBlock = {
        index: 0,
        timestamp: new Date().toISOString(),
        data: "Genesis Block",
        previousHash: "0",
      };

      genesisBlock.hash = Blockchain.calculateHash(genesisBlock);

      this.chain = [genesisBlock];

      await BlockchainModel.create({ chain: this.chain });
    } else {
      this.chain = storedChain.chain;
    }
  }

  /**
   * Add a new block
   */
  async addBlock(data) {
    const lastBlock = this.chain[this.chain.length - 1];

    const newBlock = {
      index: this.chain.length,
      timestamp: new Date().toISOString(),
      data,
      previousHash: lastBlock.hash,
    };

    newBlock.hash = Blockchain.calculateHash(newBlock);

    this.chain.push(newBlock);

    await BlockchainModel.updateOne({}, { chain: this.chain });

    return newBlock;
  }

  /**
   * Validate chain SAFELY (no instance methods)
   */
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const current = this.chain[i];
      const previous = this.chain[i - 1];

      const recalculatedHash = Blockchain.calculateHash(current);

      if (current.hash !== recalculatedHash) return false;
      if (current.previousHash !== previous.hash) return false;
    }
    return true;
  }
}

module.exports = Blockchain;
