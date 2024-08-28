const knex = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

dotenv.config();
const secret = process.env.JWT_SECRET || 'your_jwt_secret_key';

exports.authenticateUser = async (req, res) => {
  const { name, email, password, nationalID } = req.body;

  console.log('Request body:', req.body); // Log request body for debugging
  
  try {
    const user = await knex('citizens')
      .where({ name, email, national_id: nationalID })
      .first();

    if (!user) {
      console.log('User not found'); // Log if user is not found
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log('Password does not match'); // Log if password does not match
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user.national_id }, secret, { expiresIn: '1d' });
    
   // res.json({ token });
   res.json({ token, nationalID: user.national_id });
  } catch (err) {
    console.error('Error in authenticateUser:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
