import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      first_name: "Stephen",
      last_name: "Scholtz",
      email: "scholtz.gnome@gmail.com",
      password: null,
      role: "admin",
      verified: true,
    },
  ]);
}
