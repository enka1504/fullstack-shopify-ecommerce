const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String},
    isAdmin: { type: Boolean, default: false },
    img:{type: String},
    gender:{type: String},
    fullName: {type: String},
    status:{ type: Boolean, default: true},
    phoneNumber: {type: String},
    address: {type: String}
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
