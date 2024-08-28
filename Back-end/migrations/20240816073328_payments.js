// migrations/20240814120000_create_payments_table.js

exports.up = function (knex) {
  return knex.schema.createTable("payments", (table) => {
    table.increments("id").primary();
    table.string("stripe_payment_id").notNullable();
    table.decimal("amount", 10, 2).notNullable();
    table.string("currency").notNullable();
    table.string("status").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("payments");
};
