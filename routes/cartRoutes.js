const express = require("express");
const { getCart, addToCart, removeFromCart, clearCart } = require("../controllers/cartController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Protected Routes (Require Authentication)
router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.delete("/:itemId", protect, removeFromCart);
router.delete("/", protect, clearCart);

module.exports = router;
