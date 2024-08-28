// // "http://localhost:5000/api/local/listing"
// const express = require("express");
// const router = express.Router();
// const taskController = require("../controllers/localcontrollers.js");
// const auth = require("../middleware/auth.js");

// router.get("/listing", taskController.getlisting);
// router.get("/districts", taskController.getdistricts);

// module.exports = router;
const express = require("express");
const router = express.Router();
const LocalController = require("../controllers/localcontrollers");

// Get list of districts
router.get("/districts", LocalController.getdistricts);

// Get lists by district
router.get("/lists", LocalController.getlistsByDistrict);

// Get party lists
router.get("/party", LocalController.getparty);

// Get user data
router.get("/users", LocalController.userid);

// Check vote status
router.get("/checkvotestatus/:national_id", LocalController.checkVoteStatus);

// Register a vote
router.post("/vote", LocalController.vote);

// Update vote status
router.put("/donevoting", LocalController.updateIsVotedParty);

// Get candidates by list
router.get("/candidates/:listId", LocalController.getCandidatesByList);

// Register a vote for a list
router.post("/vote-for-list", LocalController.voteForList);

module.exports = router;
