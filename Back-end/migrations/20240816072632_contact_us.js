exports.up = function (knex) {
  return knex.schema.createTable("contact_us", function (table) {
    table.increments("id").primary(); // Primary key
    table.string("national_id").notNullable(); // National ID
    table.string("name").notNullable(); // User's name
    table.string("email").notNullable(); // Email address
    table.string("subject").notNullable(); // Subject of the message
    table.text("message").notNullable(); // Message content
    table.timestamp("created_at").defaultTo(knex.fn.now()); // Timestamp of creation

    // Foreign key linking to the citizens table
    table
      .foreign("national_id")
      .references("national_id")
      .inTable("citizens")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("contact_us");
};
