import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("user").del();

  await knex("user").insert([
    {
      first_name: "Stephen",
      last_name: "Scholtz",
      email: "scholtz.gnome@gmail.com",
      role: "admin",
    },
  ]);
}
