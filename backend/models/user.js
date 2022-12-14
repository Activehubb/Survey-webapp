const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Creating User Models
const userSchema = new Schema(
  {
    fname: {
      type: String,
      required: [true, "Please enter firstname"],
    },
    lname: {
      type: String,
      required: [true, "Please enter Last name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      select: false,
      minlength: [6, "Your password must be longer than six characters"],
    },
  },
  { timestamps: true }
);

// Encrypting Password before saving user details.

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// Return JWT token
userSchema.methods.getJwtToken = function () {
  const payload = { id: this._id };

  return jwt.sign(payload, process.env.TOKEN, {
    expiresIn: process.env.TOKEN_EXPIRES_TIME,
  });
};

userSchema.methods.comparePassword = async function (newPassword) {
  return await bcrypt.compare(newPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
