// routes/authRoutes.js
const express = require('express');
const chatController = require('../controllers/chatController');
const router = express.Router();

router.post('/add-message', chatController.UserAddMessage);
router.get('/getmessages', chatController.getMessages);


module.exports = router;