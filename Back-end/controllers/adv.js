const knex = require('knex')(require('../knexfile').development);

const checkadv = async (req, res) => {
  try {
    const { nationalid, listid, description, listname, url } = req.body;
    
    if (!nationalid || !listid || !description || !listname || !url) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    
    // Check if the candidate exists
    const candidate = await knex('candidates_local')
      .where('national_id', nationalid)
      .first();
  
    if (candidate) {
      // If candidate exists, insert the advertisement
      const adv = await knex('adv').insert({
        national_id: nationalid,
        list_id: listid,
        description:description,
        list_name:listname,
        url_picture:url
      });
      
      res.status(200).json({ message: "Advertisement added successfully", adv });
    } else {
      res.status(404).json({ message: "Candidate not found" });
    }
  
  } catch (err) {
    console.error("An error occurred:", err);
    console.error("Error details:", {
      message: err.message,
      stack: err.stack
    });
    if (!res.headersSent) {
      res.status(500).json({ message: "حدث خطأ ما: " + err.message });
    }
  }
};

module.exports = { checkadv };