exports.up = function (knex) {
  return knex.schema.createTable("adv", (table) => {
    table.increments("id").primary(); // Primary key column (optional)

    // Foreign key to the citizens table
    table.string("national_id").notNullable();
    table.foreign("national_id").references("national_id").inTable("citizens");

    // Foreign key to the lists table (list_id)
    table.integer("list_id").unsigned().notNullable();
    table.foreign("list_id").references("list_id").inTable("lists");

    // Foreign key to the lists table (list_name)
    table.string("list_name").notNullable();

    // Additional columns
    table.text("description");
    table.string("url_picture");

    // Add timestamps if needed
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("adv");
};
