import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("song", (table) => {
    table.increments().primary();
    table.string("title").notNullable();
    table.string("alternate_title").defaultTo(null);
    table.string("artist").defaultTo(null);
    table.integer("added_by").references("id").inTable("user").defaultTo(null);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("song");
}
