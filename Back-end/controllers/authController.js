// controllers/authController.js
const authService = require('../services/authService');
const bcrypt = require('bcrypt');
const knex = require('../config/db');

exports.login = async (req, res) => {
    try {
      const { national_id } = req.body;
      console.log(national_id);
      const message = await authService.handleLogin(national_id);
      res.json({ message });
    } catch (error) {
      console.error('Error during login:', error); 
      res.status(500).json({ message: 'Login failed', error: error.message });
    }
  };
  

exports.verify = async (req, res) => {
  try {
    const { national_id, otp } = req.body;
    const token = await authService.handleVerify(national_id, otp);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.setupPassword = async (req, res) => {
    try {
        const { national_id, password } = req.body;

        if (!national_id || !password) {
            throw new Error('National ID and password are required');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await knex('citizens').where({ national_id }).update({ password: hashedPassword });

        if (result === 0) {
            throw new Error('User not found');
        }

        res.json({ message: 'Password set successfully' });
    } catch (error) {
        console.error('Password setup failed:', error); 
        res.status(500).json({ message: 'Password setup failed', error: error.message });
    }
};


 


  