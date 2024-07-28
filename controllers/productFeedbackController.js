const { ObjectId } = require('mongodb');

// Create a new product
exports.createProductFeedback = async (req, res) => {
  const db = req.app.locals.db;
  try {
    const newProductFeedback = req.body;
    console.log(newProductFeedback);
    const result = await db.collection('productFeedback').insertOne(newProductFeedback);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllProductsFeedback = async (req, res) => {
    const db = req.app.locals.db;
  
    const { queryProductId } = req.query; // Extract the title query parameter
    let query = {};
    if (queryProductId) {
      query.productId = queryProductId; // Ensure only products with status 1 are retrieved
    }
    try {
      const products = await db.collection('productFeedback').find(query).toArray();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };