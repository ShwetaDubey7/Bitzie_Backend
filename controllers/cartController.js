const Cart = require("../models/Cart");

const addToCart = async (req, res) => {
  try {
    const { name, price, imageUrl } = req.body;
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ name, price, imageUrl, quantity: 1 });
    }

    await cart.save();
    res.json({ message: "Item added to cart successfully", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.json({ items: [] }); 
    }

    res.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error); 
    res.status(500).json({ message: "Server error", error });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.itemId;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!itemId) {
      return res.status(400).json({ message: "Item ID is required" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);
    await cart.save();

    res.json({ message: "Item removed successfully", cart });
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    await Cart.findOneAndDelete({ userId });

    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };
