const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { email, fname, lname, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    const newUser = new User({ email, lname, fname, password });

    await newUser.save();

    res.status(200).json({ success: true, newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
    console.log(error);
  }
});

module.exports = router;
