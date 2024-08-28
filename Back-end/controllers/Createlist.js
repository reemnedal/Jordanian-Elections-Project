const { checkamman1id } = require("./checkamman1id.js");
const db = require("../config/db.js");

const insertListData = async (req, res) => {
  // Log the incoming request body to debug
  console.log("Received request body:", req.body);

  const { logo, location, district, list_name } = req.body;

  if (!location || !district || !list_name) {


    return res.status(400).send("Missing required fields");
  
  
  }

  // Determine district_id based on location and district
  let district_id;
  if (location === "amman" && district === "amman1") {
    district_id = 1; // Amman 1
  } else if (location === "amman" && district === "amman3") {
    district_id = 3; // Amman 3
  } else if (location === "zarqa" && district === "zarqad") {
    district_id = 6; // Zarqa
  } else {
    return res.status(400).send("Invalid district value: " + district);
  }

  try {
    console.log("district id equal: " + district_id);

    const [newList] = await db("lists")
      .insert({
        list_name: list_name,
        district_id: district_id,
        logo: logo,
      })
      .returning("list_id"); // Get the newly inserted list ID

    const listId = newList.list_id;
    // await checkamman1id(req, res, listId);
    res
      .status(200)
      .json({ message: "Data submitted successfully", listId: listId });
    // console.log("Inserted list data:", newList);

    // const listId = newList.list_id;  // Access the list_id directly from the object
    // console.log("New list ID:", listId);

    // Pass the listId to checkamman1id
    // const handleCheckAmman1Id = () => checkamman1id(req, res, listId);

    // res.status(200).send('Data submitted successfully with list ID: '  );
  } catch (error) {

    console.error("Error during insertListData:", error);
    if (!res.headersSent) {
    res.status(500).send("Server error");
    
  }
  }
};

module.exports = { insertListData };
