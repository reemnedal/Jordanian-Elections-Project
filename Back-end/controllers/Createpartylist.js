const db = require("../config/db");

const Createpartylist = async (req, res) => {
  const { partyname, partylogo } = req.body;
  console.log("Received request body:", req.body);

  try {
    // Insert the data into the party_lists table

    const [newList] = await db("party_lists")
      .insert({
        party_name: partyname,
        logo: partylogo,
        
      })
      .returning("party_list_id"); // Get the newly inserted list ID

    const listId = newList.party_list_id;
    // await checkamman1id(req, res, listId);
    res
      .status(200)
      .json({ message: "Data submitted successfully", listId: listId });

    // res.status(201).json({ message: "Party list created successfully" });
  } catch (error) {
    console.error("Error inserting data into party_lists:", error);
    res.status(500).json({ message: "Failed to create party list" });
  }
};

module.exports = { Createpartylist };
