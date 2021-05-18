import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user_community", (table) => {
    table.increments().primary();
    table
      .integer("user_id")
      .references("id")
      .inTable("user")
      .notNullable()
      .index();
    table
      .integer("community_id")
      .references("id")
      .inTable("community")
      .notNullable()
      .index();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("user_community");
}
