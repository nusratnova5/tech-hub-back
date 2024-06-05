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

  const { title,notEmail, email } = req.query; // Extract the title query parameter
  let query = {};
  if (title) {
    query.title = { $regex: title, $options: 'i' }; // Case-insensitive regex search
  }
  if (notEmail) {
    query.sellerEmail = { $ne: notEmail }; // Exclude products from this email
    query.status = 1; // Ensure only products with status 1 are retrieved
  }
  if (email) {
    query.sellerEmail = email; // Ensure only products with status 1 are retrieved
  }
  try {
    const products = await db.collection('products').find(query).toArray();
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

    const response = {
      acknowledged: true,
      data: updatedProductDetails
    };

    res.json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Delete a product by ID
exports.deleteProductById = async (req, res) => {
  const db = req.app.locals.db;
  try {
    const result = await db.collection('products').findOneAndDelete({ _id: new ObjectId(req.params.id) });

    const response = {
      acknowledged: true,
      data: result
    };

    res.json(response);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};