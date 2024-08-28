const knex = require('knex')(require('../knexfile').development);
require('dotenv').config();
const jwt = require('jsonwebtoken');
const emailService = require('./emailService');

exports.handleLogin = async (national_id) => {
  try {
    // Fetch user by national_id
    const user = await knex('citizens').where({ national_id }).first();

    // Check if user exists
    if (!user) {
      throw new Error('User not found');
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Update the user with the generated OTP
    await knex('citizens').where({ national_id }).update({ otp });

    // Send OTP email
    await emailService.sendOTPEmail(user.email, otp);

    return 'OTP sent to your email';
  } catch (error) {
    console.error('Error during login:', error);
    throw new Error('Error during login');
  }
};

exports.handleVerify = async (national_id, otp) => {
  try {
    // Fetch user by national_id and OTP
    const user = await knex('citizens').where({ national_id, otp }).first();

    // Check if user exists
    if (!user) {
      throw new Error('Invalid OTP');
    }

    // Generate JWT token
    const token = jwt.sign({ national_id: user.national_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Clear OTP from the user record
    await knex('citizens').where({ national_id }).update({ otp: null });

    return token;
    
  } catch (error) {
    console.error('Error during verification:', error);
    throw new Error('Error during verification');
  }
};
