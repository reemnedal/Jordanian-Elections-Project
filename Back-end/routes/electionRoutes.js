// routes/electionRoutes.js
const express = require('express');
const router = express.Router();
const ElectionController = require('../controllers/electionController');

router.get('/elections/:id', ElectionController.getElectionById);

module.exports = router;
