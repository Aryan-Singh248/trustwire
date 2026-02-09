const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Blockchain Finance Backend Running");
});

// API routes (blockchain)
app.use("/api", require("./routes/test.routes"));

// User (wallet) routes
app.use("/users", require("./routes/user.routes"));

const PORT = process.env.PORT || 5001;

// Connect DB first, then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect DB:", err.message);
  });
