import db from "../../db/db.connection";
import * as CommunitiesRepo from "../repositories/communitiesRepo";
import NewCommunity from "../interfaces/NewCommunity";

export const readCommunities = async () => {
  try {
    const communities = await CommunitiesRepo.readCommunities(db);

    return communities;
  } catch (err) {
    console.log(err);
    throw new Error("readCommunities service error");
  }
};

export const readCommunity = async (communityId: number) => {
  try {
    const community = await CommunitiesRepo.readCommunity(db, communityId);

    return community;
  } catch (err) {
    console.log(err);
    throw new Error("readCommunity service error");
  }
};

export const createCommunity = async (newCommunity: NewCommunity) => {
  try {
    const community = await CommunitiesRepo.createCommunity(db, newCommunity);

    return community;
  } catch (err) {
    console.log(err);
    throw new Error("createCommunity service error");
  }
};

export const updateCommunity = async (
  communityId: number,
  updates: NewCommunity
) => {
  try {
    const updatedCommunity = await CommunitiesRepo.updateCommunity(
      db,
      communityId,
      updates
    );

    return updatedCommunity;
  } catch (err) {
    console.log(err);
    throw new Error("updateCommunity service error");
  }
};

export const deleteCommunity = async (communityId: number) => {
  try {
    const community = await CommunitiesRepo.deleteCommunity(db, communityId);

    return community;
  } catch (err) {
    console.log(err);
    throw new Error("deleteCommunity service error");
  }
};
