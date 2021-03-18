import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.increments().primary();
    table.string("first_name").notNullable();
    table.string("last_name");
    table.string("email").notNullable();
    table.string("password");
    table.string("role").notNullable().defaultTo("guest");
    table.boolean("verified").defaultTo(false);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
