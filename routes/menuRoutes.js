const express = require("express");
const { getMenu, addMenuItem, deleteMenuItem } = require("../controllers/menuController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Public Route - Fetch Menu
router.get("/", getMenu);

// Protected Routes - Requires Authentication
router.post("/add", protect, addMenuItem);
router.delete("/:id", protect, deleteMenuItem);

module.exports = router;
