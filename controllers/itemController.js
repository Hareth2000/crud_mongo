
// controllers/itemController.js
const Item = require('../models/itemModel');

// all items 
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find({ isDeleted: false });
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving items', error: err });
    }
};

// (Retrieve by ID)
exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving item', error: err });
    }
};









////////////////////////////////////////////////////////////////////////////////////////////////////////

// Create a new item (Create)
exports.createItem = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newItem = new Item({ name, description });
        await newItem.save();
        res.status(201).json({ message: 'Item saved successfully', item: newItem });
    } catch (err) {
        res.status(400).json({ message: 'Error saving item', error: err });
    }
};
// Update an item (Update)
exports.updateItem = async (req, res) => {
    try {
        const { name, description } = req.body;
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            { name, description, updatedAt: Date.now() },
            { new: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item updated successfully', item: updatedItem });
    } catch (err) {
        res.status(500).json({ message: 'Error updating item', error: err });
    }
};

// Delete an item (Delete)
exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting item', error: err });
    }
};

// Soft delete an item (Soft Delete)
exports.softDeleteItem = async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            { isDeleted: true },
            { new: true }
        );
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item soft deleted successfully', item: updatedItem });
    } catch (err) {
        res.status(500).json({ message: 'Error soft deleting item', error: err });
    }
};
