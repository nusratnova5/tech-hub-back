const { ObjectId } = require('mongodb');

// Get all users
const getAllUsers = async (req, res) => {
  const db = req.app.locals.db;
  try {
    const users = await db.collection('users').find().toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  const db = req.app.locals.db;
  try {
    const user = await db.collection('users').findOne({ _id: new ObjectId(req.params.id) });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user by ID
const updateUserById = async (req, res) => {
    const db = req.app.locals.db;
    try {
      const userId = new ObjectId(req.params.id);
      const updatedUser = req.body;
  
      const user = await db.collection('users').findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update the user
      await db.collection('users').updateOne(
        { _id: userId },
        { $set: updatedUser }
      );
  
      // Get the updated user
      const updatedUserDetails = await db.collection('users').findOne({ _id: userId });

      const response = {
        acknowledged: true,
        data: updatedUserDetails
      };
  
      res.json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

// Delete a user by ID
const deleteUserById = async (req, res) => {
  const db = req.app.locals.db;
  try {
    const result = await db.collection('users').findOneAndDelete({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const dashboardData = async (req, res) => {
  const db = req.app.locals.db;
  try {
    // Query to count the number of users
    const userCount = await db.collection('users').countDocuments();
    
    // Query to count the number of products
    const productCount = await db.collection('products').countDocuments();

    // Construct the response object with the counts
    const responseData = {
      userCount,
      productCount
    };

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  dashboardData
};