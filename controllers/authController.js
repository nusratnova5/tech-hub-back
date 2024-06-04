const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
  const db = req.app.locals.db;
  const { email } = req.body;

  try {
    const user = await db.collection('users').findOne({ email });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const response = {
      acknowledged: true,
      user,
      token
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.register = async (req, res) => {
  const db = req.app.locals.db;
  try {
    const { email } = req.body;

    // Check if a user with the provided email already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
    const newUser = req.body;
    const result = await db.collection('users').insertOne(newUser);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};