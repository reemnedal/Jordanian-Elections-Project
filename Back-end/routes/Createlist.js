const express = require("express");
const router = express.Router();
const { insertListData } = require("../controllers/Createlist.js");
const { checkamman1id } = require("../controllers/checkamman1id.js");
const { checkamman3id } = require("../controllers/checkamman3id.js");
const { checkzarqaa } = require("../controllers/checkzarqaa.js");
const { checkadv } = require("../controllers/adv.js");
const { Createpartylist } = require("../controllers/Createpartylist.js");
const { checkpartycand } = require("../controllers/checkpartycand.js");
// Route to handle form submission
router.post("/submit-form-Createlist", insertListData);
router.post("/submitcandidatesAmman1", checkamman1id);
router.post("/submitcandidatesZarqaa", checkzarqaa);
router.post("/submitcandidatesAmman3", checkamman3id);
router.post("/adv", checkadv);
router.post("/handlelistpartyname", Createpartylist);
router.post("/handleCandidateparty", checkpartycand);

module.exports = router;
