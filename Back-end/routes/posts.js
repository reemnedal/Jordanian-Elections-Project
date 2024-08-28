// server/routes/posts.js
const express = require('express');
const router = express.Router();
const knex = require('../config/db'); // Adjust the path to your knex configuration

// Get all advertisement posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await knex('adv').select('*');
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching posts", error: err.message });
  }
});

module.exports = router;
