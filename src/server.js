const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/records", require("./routes/recordRoutes"));
app.use("/summary", require("./routes/summaryRoutes"));

// Health check
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});