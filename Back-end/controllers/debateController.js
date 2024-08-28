// const db = require("../db/connection");

// // Create a new debate
// exports.createDebate = async (req, res) => {
//   try {
//     const { name, start_time, end_time, candidates } = req.body;

//     // Check if candidates exist in the candidates table
//     const existingCandidates = await db("candidates")
//       .whereIn("national_id", candidates)
//       .pluck("national_id");
//     if (existingCandidates.length !== candidates.length) {
//       return res
//         .status(400)
//         .json({ message: "One or more candidates are not registered." });
//     }

//     // Insert debate
//     const [debateId] = await db("debates")
//       .insert({
//         name,
//         start_time,
//         end_time,
//       })
//       .returning("id");

//     // Insert candidates
//     const candidatesData = candidates.map((national_id) => ({
//       debate_id: debateId,
//       user_id: national_id,
//     }));
//     await db("debate_candidates").insert(candidatesData);

//     res.status(201).json({ message: "Debate created successfully", debateId });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating debate", error });
//   }
// };

// // Get debate details
// exports.getDebate = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const debate = await db("debates").where("id", id).first();
//     if (!debate) {
//       return res.status(404).json({ message: "Debate not found" });
//     }

//     const candidates = await db("debate_candidates")
//       .join("candidates", "debate_candidates.user_id", "candidates.national_id")
//       .where("debate_candidates.debate_id", id)
//       .select("candidates.name");

//     res.status(200).json({ ...debate, candidates });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching debate", error });
//   }
// };

// // Approve a debate
// exports.approveDebate = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const [debate] = await db("debates")
//       .where("id", id)
//       .update({ isApproved: true })
//       .returning("*");
//     if (!debate) {
//       return res.status(404).json({ message: "Debate not found" });
//     }
//     res.status(200).json({ message: "Debate approved", debate });
//   } catch (error) {
//     res.status(500).json({ message: "Error approving debate", error });
//   }
// };
///////////////////////////////////
const express = require("express");
const router = express.Router();
const db = require("../config/db");

// Get all approved debates
router.get("/", async (req, res) => {
  try {
    const debates = await db("debates")
      .select(
        "debates.*",
        "c1.name as candidate1_name",
        "c2.name as candidate2_name"
      )
      .leftJoin("citizens as c1", "debates.candidate1_id", "c1.national_id")
      .leftJoin("citizens as c2", "debates.candidate2_id", "c2.national_id")
      .where("debates.isApproved", true)
      .orderBy("debates.start_time", "asc");

    res.json(debates);
  } catch (error) {
    console.error("Error fetching approved debates:", error);
    res.status(500).json({ error: "An error occurred while fetching debates" });
  }
});

// Create a new debate
router.post("/", async (req, res) => {
  try {
    const { name, start_time, end_time, candidate1_id, candidate2_id } =
      req.body;

    // Check if both candidates exist in the candidates table
    const candidates = await db("candidates_local")
      .whereIn("national_id", [candidate1_id, candidate2_id])
      .select("national_id");

    if (candidates.length !== 2) {
      return res.status(400).json({ error: "Invalid candidate IDs" });
    }

    const debate = await db("debates")
      .insert({
        name,
        start_time,
        end_time,
        candidate1_id,
        candidate2_id,
        isApproved: false,
      })
      .returning("*");

    res.status(201).json(debate[0]);
  } catch (error) {
    console.error("Error creating debate:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the debate" });
  }
});

// Get a specific debate
router.get("/:id", async (req, res) => {
  try {
    const debate = await db("debates")
      .select(
        "debates.*",
        "c1.name as candidate1_name",
        "c2.name as candidate2_name"
      )
      .leftJoin("citizens as c1", "debates.candidate1_id", "c1.national_id")
      .leftJoin("citizens as c2", "debates.candidate2_id", "c2.national_id")
      .where("debates.id", req.params.id)
      .andWhere("debates.isApproved", true)
      .first();

    if (!debate) {
      return res
        .status(404)
        .json({ error: "Debate not found or not approved" });
    }

    res.json(debate);
  } catch (error) {
    console.error("Error fetching debate:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the debate" });
  }
});

// Approve a debate
router.patch("/:id/approve", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedDebate = await db("debates")
      .where("id", id)
      .update({ isApproved: true })
      .returning("*");

    if (updatedDebate.length === 0) {
      return res.status(404).json({ error: "Debate not found" });
    }

    res.json(updatedDebate[0]);
  } catch (error) {
    console.error("Error approving debate:", error);
    res
      .status(500)
      .json({ error: "An error occurred while approving the debate" });
  }
});

module.exports = router;
