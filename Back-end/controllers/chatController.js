const knex = require("knex")(require("../knexfile").development);

exports.UserAddMessage = async (req, res) => {
  const { national_id, UserMessage } = req.body;
  try {
    await knex("chat").insert({
      national_id, // Store the national_id with each message
      Message: UserMessage,
      admin: false,
      Deleted: false,
    });
    res.status(201).json({ message: "تمت إضافة رسالة بنجاح!" });
  } catch (error) {
    res.status(500).json({ error: "حدث خطأ أثناء إرسال الرسالة." });
  }
};

exports.getMessages = async (req, res) => {
  const { national_id } = req.query; // Get the national_id from query parameters
  if (!national_id) {
    return res.status(400).json({ error: "National ID is required" });
  }

  try {
    const Messages = await knex("chat").select("*").where({
      national_id, // Filter messages by national_id
      Deleted: false,
    });
    res.status(200).json(Messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "حدث خطأ أثناء جلب الرسائل." });
  }
};
