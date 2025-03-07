// menuController.js - Handles Menu Operations
const MenuItem = require("../models/MenuItem");

const getMenu = async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (error) {
    console.error("Error fetching menu:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const addMenuItem = async (req, res) => {
  try {
    const { name, price, imageUrl } = req.body;
    if (!name || !price || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = new MenuItem({ name, price, imageUrl });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error adding menu item:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await MenuItem.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getMenu, addMenuItem, deleteMenuItem };
