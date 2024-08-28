exports.up = function (knex) {
  return knex.schema.createTable("candidates_party", function (table) {
    table.string("national_id").notNullable(); // الرقم الوطني كـ string وغير قابل للنول
    table.integer("party_list_id").unsigned().notNullable(); // Foreign key for party_list_id

    table.integer("vote_count").defaultTo(0); // Vote count
    table.boolean("activation").defaultTo(false); // Activation status
    table.timestamps(true, true); // Created at and updated at timestamps

    table
      .foreign("national_id")
      .references("national_id")
      .inTable("citizens")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
    table
      .foreign("party_list_id")
      .references("party_list_id")
      .inTable("party_lists")
      .onDelete("CASCADE")
      .onUpdate("CASCADE"); // Reference to the party_lists table

    table.primary(["national_id", "party_list_id"]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("candidates_party");
};
