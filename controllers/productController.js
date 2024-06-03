const { ObjectId } = require('mongodb');

// Create a new product
exports.createProduct = async (req, res) => {
  const db = req.app.locals.db;
  try {
    const newProduct = req.body;
    const result = await db.collection('products').insertOne(newProduct);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  const db = req.app.locals.db;
  try {
    const products = await db.collection('products').find().toArray();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  const db = req.app.locals.db;
  try {
    const product = await db.collection('products').findOne({ _id: new ObjectId(req.params.id) });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product by ID
exports.updateProductById = async (req, res) => {
    const db = req.app.locals.db;
    try {
      const productId = new ObjectId(req.params.id);
      const updatedProduct = req.body;
  
      const product = await db.collection('products').findOne({ _id: productId });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Update the product
      await db.collection('products').updateOne(
        { _id: productId },
        { $set: updatedProduct }
      );
  
      // Get the updated product
      const updatedProductDetails = await db.collection('products').findOne({ _id: productId });
  
      res.json(updatedProductDetails);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

// Delete a product by ID
exports.deleteProductById = async (req, res) => {
  const db = req.app.locals.db;
  try {
    const result = await db.collection('products').findOneAndDelete({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};