const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

const { verifyToken } = require('../middleware/auth');
router.use(verifyToken);

// Create a new user
router.post('/', productController.createProduct);

// Get all users
router.get('/', productController.getAllProducts);

// Get a user by ID
router.get('/:id', productController.getProductById);

// Update a user by ID
router.put('/:id', productController.updateProductById);

// Delete a user by ID
router.delete('/:id', productController.deleteProductById);

module.exports = router;
