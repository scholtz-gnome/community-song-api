import { Request, Response } from "express";
import * as CommunitiesService from "../services/communitiesService";
import NewCommunity from "../interfaces/NewCommunity";

export const getCommunities = async (req: Request, res: Response) => {
  try {
    const communities = await CommunitiesService.readCommunities();

    return res.status(200).json({
      success: true,
      message: "All communities retrieved",
      communities,
    });
  } catch (err) {
    console.log(err);
    throw new Error("getCommunities error");
  }
};

export const getCommunity = async (req: Request, res: Response) => {
  const communityId: number = Number(req.params.id);
  try {
    const community = await CommunitiesService.readCommunity(communityId);

    return res.status(200).json({
      success: true,
      message: `${community.name} community retrieved`,
      community,
    });
  } catch (err) {
    console.log(err);
    throw new Error("getCommunity controller error");
  }
};

export const postCommunity = async (req: Request, res: Response) => {
  const newCommunity: NewCommunity = {
    name: req.body.name,
    about: req.body.about,
    type: req.body.type,
  };
  try {
    const community = await CommunitiesService.createCommunity(newCommunity);

    return res.status(200).json({
      success: true,
      message: `${community.name} community created`,
    });
  } catch (err) {
    console.log(err);
    throw new Error("postCommunity controller error");
  }
};

export const patchCommunity = async (req: Request, res: Response) => {
  const communityId: number = Number(req.params.id);
  const updates: NewCommunity = {
    name: req.body.name,
    about: req.body.about,
    type: req.body.type,
  };
  try {
    const updatedCommunity = await CommunitiesService.updateCommunity(
      communityId,
      updates
    );

    return res.status(200).json({
      success: true,
      message: "Community updated",
      updatedCommunity,
    });
  } catch (err) {
    console.log(err);
    throw new Error("patchCommunity controller error");
  }
};

export const deleteCommunity = async (req: Request, res: Response) => {
  const communityId: number = Number(req.params.id);
  try {
    const community = await CommunitiesService.deleteCommunity(communityId);

    return res.status(200).json({
      success: true,
      message: `${community.name} community deleted`,
    });
  } catch (err) {
    console.log(err);
    throw new Error("deleteCommunity controller error");
  }
};
