import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("file", (table) => {
    table.increments().primary();
    table.string("title").notNullable();
    table.string("artist").defaultTo(null);
    table.string("url").defaultTo(null);
    table.integer("user_id").references("id").inTable("user");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("file");
}
