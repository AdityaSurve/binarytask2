const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./Routes/AuthRoutes");
const cookieParser = require("cookie-parser");
const Transaction = require("./Models/transactionModel");

dotenv.config();
const app = express();

app.listen(4000, () => {
  console.log("server is running on port 4000");
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  cors({
    origin: "http://localhost:3000",
    method: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/", authRoutes);
app.get("/api/transactions", (req, res) => {
  Transaction.find({})
    .then((transactions) => {
      res.json(transactions);
    })
    .catch((error) => {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ error: "Failed to retrieve transactions" });
    });
});
