const Order = require("../models/Order");

const placeOrder = async (req, res) => {
  try {
    const { items, totalAmount, customerDetails, paymentMethod } = req.body;

    if (!items || items.length === 0 || !totalAmount || !customerDetails) {
      return res.status(400).json({ message: "Invalid order details" });
    }

    if (!totalAmount || !paymentMethod) {
      return res.status(400).json({ message: "Missing payment details" });
    }

    const newOrder = new Order({
      userId: req.user._id,
      items,
      totalAmount,
      customerDetails,
      paymentMethod,
      status: "Processing",
    });

    await newOrder.save();

    res.status(201).json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const processPayment = async (req, res) => {
  try {
    const { paymentMethod, totalAmount, items } = req.body;
    const userId = req.user.id;

    if (!paymentMethod || !totalAmount || !items || items.length === 0) {
      return res.status(400).json({ message: "Missing payment details" });
    }

    const newOrder = new Order({
      userId,
      items: [],
      totalAmount,
      paymentMethod,
      status: "Paid",
    });

    await newOrder.save();

    res.status(201).json({ message: "Payment successful!", order: newOrder });
  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ message: "Payment processing failed", error });
  }
};

module.exports = { processPayment, placeOrder  };
