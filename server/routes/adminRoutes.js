const express = require("express");
const Message = require("../models/Message");
const { protect } = require("../middleware/auth");

const router = express.Router();

// GET /api/admin/dashboard/messages - All contact messages (admin only)
router.get("/messages", protect, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
