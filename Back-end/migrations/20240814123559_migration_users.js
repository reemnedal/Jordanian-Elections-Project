exports.up = function (knex) {
  return knex.schema.createTable("citizens", function (table) {
    table.string("national_id").primary(); // Primary key: national_id
    table.string("name").notNullable(); // Name column
    table.string("religion").notNullable(); // Religion column
    table.string("email").notNullable().unique(); // Email column, must be unique
    table.string("governorate").notNullable(); // Governorate column
    table.string("electoral_district").notNullable(); // Electoral district column
    table.string("region").notNullable(); // Region column
    table.boolean("is_voted_party").defaultTo(false); // Flag for party voting
    table.boolean("is_voted_local").defaultTo(false); // Flag for local voting
    table.string("gender").notNullable(); // Gender column
    table.integer("otp").unique(); // OTP column, must be unique
    table.text("password").notNullable(); // Password column, use text type for variable-length data
    table.timestamps(true, true); // Created_at and updated_at timestamps
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("citizens");
};
