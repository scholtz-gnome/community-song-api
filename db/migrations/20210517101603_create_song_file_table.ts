import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("song_file", (table) => {
    table.increments().primary();
    table.integer("song_id").references("id").inTable("song").notNullable();
    table.integer("file_id").references("id").inTable("file").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("song_file");
}
