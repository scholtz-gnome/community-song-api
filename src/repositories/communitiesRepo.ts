import Community from "../interfaces/Community";
import NewCommunity from "../interfaces/NewCommunity";
import { Knex } from "knex";

export const readCommunities = async (db: Knex): Promise<Community[]> => {
  try {
    const communities: Community[] = await db<Community>("community").select(
      "id",
      "name",
      "about",
      "type"
    );

    return communities;
  } catch (err) {
    console.log(err);
    throw new Error("readCommunities repo error");
  }
};

export const readCommunity = async (
  db: Knex,
  communityId: number
): Promise<Community> => {
  try {
    const [community]: Community[] = await db<Community>("community")
      .where("id", communityId)
      .select("id", "name", "about", "type")
      .limit(1);

    return community;
  } catch (err) {
    console.log(err);
    throw new Error("readCommunity repo error");
  }
};

export const createCommunity = async (
  db: Knex,
  newCommunity: NewCommunity
): Promise<Community> => {
  try {
    const [community]: Community[] = await db<Community>("community")
      .returning(["id", "name", "about", "type"])
      .insert(newCommunity);

    return community;
  } catch (err) {
    console.log(err);
    throw new Error("createCommunity repo error");
  }
};

export const updateCommunity = async (
  db: Knex,
  communityId: number,
  updates: NewCommunity
): Promise<Community> => {
  try {
    const [updatedCommunity]: Community[] = await db<Community>("community")
      .returning(["id", "name", "about", "type"])
      .where("id", communityId)
      .update({ name: updates.name, about: updates.about, type: updates.type });

    return updatedCommunity;
  } catch (err) {
    console.log(err);
    throw new Error("updateCommunity repo error");
  }
};

export const deleteCommunity = async (
  db: Knex,
  communityId: number
): Promise<Community> => {
  try {
    const [community]: Community[] = await db<Community>("community")
      .returning(["name"])
      .where("id", communityId)
      .del();

    return community;
  } catch (err) {
    console.log(err);
    throw new Error("deleteCommunity repo error");
  }
};
