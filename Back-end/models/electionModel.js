const knex = require('knex')(require('../knexfile').development);

class ElectionModel {
  static async getElectionById(id) {
    return knex('elections').where({ Election_ID: id }).first();
  }
}

module.exports = ElectionModel;
