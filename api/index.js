const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const CryptoJS = require("crypto-js");

const cors = require("cors");
mongoose.connect(
  "mongodb://localhost:27017/shopifyDB",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("DBConnection Successful");
  },
);
const data = "Hello, World!";
const key = "1234567890123456"; // 16-byte key for AES-128

if (!data || !key) {
  console.error("Data or key is missing!");
  return;
}

// const parsedKey = CryptoJS.enc.Utf8.parse(key);

// // Ensure the data is a valid string
// if (typeof data !== "string") {
//   console.error("Data must be a string");
//   return;
// }
// const parsedData = CryptoJS.enc.Utf8.parse(data);
// console.log(parsedKey, "parsedData:", parsedData);

// // Encrypt the data with PKCS7 padding and CBC mode
// const encrypted = CryptoJS.AES.encrypt(parsedData, parsedKey);

// console.log("Encrypted:", encrypted.toString());

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
