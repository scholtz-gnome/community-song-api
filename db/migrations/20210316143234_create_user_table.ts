import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user", (table) => {
    table.increments().primary();
    table.string("username").notNullable();
    table.string("first_name").defaultTo(null);
    table.string("last_name").defaultTo(null);
    table.string("email").unique().notNullable();
    table.string("password").defaultTo(null);
    table.string("role").notNullable().defaultTo("guest");
    table.boolean("verified").defaultTo(false);
    table.string("profile_pic").defaultTo(null);
    table.string("identity_provider").defaultTo(null);
    table.string("idp_id").unique().defaultTo(null);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("user");
}
