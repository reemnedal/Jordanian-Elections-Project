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
