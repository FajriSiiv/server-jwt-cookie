const express = require("express");
const dotenv = require("dotenv");
const { mongoose } = require("mongoose");
const router = require("./route");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");
const cookieParser = require("cookie-parser");
dotenv.config();

exports.secretKey = "yourSecretKey";
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URIS;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message:
    "Terlalu banyak permintaan dari IP Anda. Silakan coba lagi dalam beberapa menit.",
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

mongoose
  .connect(
    MONGODB_URI,

    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

app.use(router);
app.use(limiter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
