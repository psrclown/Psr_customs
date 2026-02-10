const express = require("express");
const Message = require("../models/Message");

const router = express.Router();

// POST /api/contact - Save message from contact page
// Kept simple (no auth) since it's public-facing
router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMessage = new Message({
      name,
      email,
      subject,
      message,
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      message: "Message saved successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
