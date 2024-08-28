const ElectionModel = require('../models/electionModel');

exports.getElectionById = async (req, res) => {
  const { id } = req.params;
  console.log(`Fetching election with ID: ${id}`); // Log the ID for debugging
  try {
    const election = await ElectionModel.getElectionById(id);
    if (election) {
      res.status(200).json(election);
    } else {
      res.status(404).json({ error: 'Election not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch election' });
  }
};
