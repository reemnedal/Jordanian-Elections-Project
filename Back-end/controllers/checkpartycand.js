const db = require("../config/db");

const checkpartycand = async (req, res) => {
  console.log("Received request body:", req.body);

  const { listID, candone, candtwo, candthree, candfour } = req.body;

  try {
    // Step 1: Check if any of the candidates are in the candidates_local table
    const localCandidates = await db("candidates_local").whereIn(
      "national_id",
      [candone, candtwo, candthree, candfour]
    );

    if (localCandidates.length > 0) {
      // return res.status(400).json({ message: 'لا تستطيع الترشح بالقوائم الحزبية والمحلية معا' });
      return res.json({
        message: "لا تستطيع الترشح بالقوائم الحزبية والمحلية معا",
      });
    }

    // Step 2: Check for duplicates in candidates_party
    const existingPartyCandidates = await db("candidates_party").whereIn(
      "national_id",
      [candone, candtwo, candthree, candfour]
    );

    if (existingPartyCandidates.length > 0) {
      return res.json({
        message: "National ID already exists in party candidates",
      });
    }

    // Step 3: Insert data into candidates_party table
    await db("candidates_party").insert([
      { party_list_id: listID, national_id: candone },
      { party_list_id: listID, national_id: candtwo },
      { party_list_id: listID, national_id: candthree },
      { party_list_id: listID, national_id: candfour },
    ]);

    // Send success response
    res.json({ message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error inserting data:", error);
    // Send error response
    res.json({ message: "Failed to insert data: " + error.message });
  }
};

module.exports = { checkpartycand };
