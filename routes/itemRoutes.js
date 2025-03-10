// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');


router.get('/items', itemController.getAllItems);
router.get('/item/:id', itemController.getItemById);

///////////////////////////////////////////////////////////////
router.post('/save', itemController.createItem);
router.put('/item/:id', itemController.updateItem);
router.delete('/item/:id', itemController.deleteItem);
router.patch('/item/:id/soft-delete', itemController.softDeleteItem);
///////////////////////////////////////////////////////////////
module.exports = router;
