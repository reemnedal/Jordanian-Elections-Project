// // "http://localhost:5000/api/local/listing"
// const db = require("../config/db");

// exports.getlisting = async (req, res) => {
//   async function getalldata() {
//     try {
//       const data = await db("lists").select("*");
//       // .where("logo", "=", "العدالة هي الأساس");
//       res.json(data);
//       console.log(data);
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   getalldata();
// };

// exports.getdistricts = async (req, res) => {
//   async function test() {
//     try {
//       const data12 = await db("districts").select("*");
//       res.json(data12);
//       console.log(data12);
//     } catch (err) {
//       console.log(err);
//     }
//   }
//   test();
// };

const db = require("../config/db");

// Get list of districts
exports.getdistricts = async (req, res) => {
  try {
    const data = await db("districts").select("*");
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get lists by district
exports.getlistsByDistrict = async (req, res) => {
  const { district_id } = req.query;
  try {
    if (!district_id) {
      return res.status(400).json({ error: "district_id is required" });
    }
    const data = await db("lists")
      .where("district_id", district_id)
      .andWhere("activation", true);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get party lists
exports.getparty = async (req, res) => {
  try {
    const data = await db("party_lists").select("*");
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Get user data
exports.userid = async (req, res) => {
  try {
    const data = await db("citizens").select("*");
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// Check vote status
exports.checkVoteStatus = async (req, res) => {
  const { national_id } = req.params;
  try {
    const result = await db("citizens")
      .select("is_voted_party")
      .where({ national_id })
      .first();

    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ is_voted_party: result.is_voted_party });
  } catch (err) {
    console.error("Error checking vote status:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Register a vote
exports.vote = async (req, res) => {
  const { party_list_id, national_id } = req.body;

  if (!party_list_id || !national_id) {
    return res
      .status(400)
      .json({ error: "party_list_id and national_id are required." });
  }

  try {
    // Verify the citizen's voting status
    const citizen = await db("citizens")
      .select("is_voted_party")
      .where({ national_id })
      .first();

    if (!citizen) {
      return res.status(404).json({ error: "User not found." });
    }

    if (citizen.is_voted_party) {
      return res.status(400).json({ error: "User has already voted." });
    }

    // Perform the transaction
    await db.transaction(async (trx) => {
      await trx("party_lists")
        .where({ party_list_id })
        .increment("vote_count", 1);

      await trx("citizens")
        .where({ national_id })
        .update({ is_voted_party: true });
    });

    res.json({ message: "Vote successfully recorded." });
  } catch (err) {
    console.error("Error in vote controller:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};

// Update vote status
exports.updateIsVotedParty = async (req, res) => {
  const { national_id } = req.body;

  try {
    const result = await db("citizens")
      .where({ national_id })
      .update({ is_voted_party: true });

    if (result === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "Vote status updated successfully." });
  } catch (error) {
    console.error("Error updating vote status:", error);
    res.status(500).json({ error: "Error updating vote status." });
  }
};

// Get candidates by list
exports.getCandidatesByList = async (req, res) => {
  const { listId } = req.params;
  try {
    const candidates = await db("candidates_local")
      .join("citizens", "candidates_local.national_id", "citizens.national_id")
      .where("candidates_local.list_id", listId)
      .select(
        "candidates_local.national_id",
        "citizens.name",
        "citizens.religion",
        "citizens.email",
        "citizens.governorate",
        "citizens.electoral_district",
        "citizens.region",
        "citizens.gender"
      );

    res.json(candidates);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Register a vote for a list
exports.voteForList = async (req, res) => {
  const { national_id, list_id, selected_candidates } = req.body;

  // التحقق من أن قائمة المرشحين المختارين موجودة وصحيحة
  // if (!Array.isArray(selected_candidates) || selected_candidates.length === 0) {
  //   return res.status(400).json({ error: "No candidates selected." });
  // }

  try {
    // التحقق من حالة التصويت للمواطن
    const citizen = await db("citizens")
      .select("is_voted_local")
      .where({ national_id })
      .first();

    if (!citizen) {
      return res.status(404).json({ error: "المستخدم غير موجود" });
    }

    if (citizen.is_voted_local) {
      return res.status(400).json({ error: "لقد تم التصويت بالفعل " });
    }

    // تنفيذ المعاملة
    await db.transaction(async (trx) => {
      // تحديث عداد الأصوات في جدول القوائم
      await trx("lists").where("list_id", list_id).increment("vote_count", 1);

      // تحديث عداد الأصوات لكل مرشح مختار في جدول candidates_local
      for (const candidateNationalId of selected_candidates) {
        await trx("candidates_local")
          .where({ national_id: candidateNationalId })
          .increment("vote_count", 1);
      }

      // تحديث حالة التصويت للمواطن
      await trx("citizens")
        .where({ national_id })
        .update({ is_voted_local: true });
    });

    res.json({ message: "تم التصويت بنجاح." });
  } catch (err) {
    console.error("Error in voteForList controller:", err);
    res.status(500).json({ error: "Server Error", details: err.message });
  }
};
