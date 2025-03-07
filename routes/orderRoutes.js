const express = require("express");
const router = express.Router();
const { processPayment, placeOrder } = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");

// Protected Routes - Requires Authentication
router.post("/payment", protect, processPayment);
router.post("/checkout", protect, placeOrder);


module.exports = router;
