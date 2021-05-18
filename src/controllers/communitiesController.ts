import { Request, Response } from "express";

export const getCommunities = async (req: Request, res: Response) => {
  res
    .status(200)
    .json({
      success: true,
      message: "You've made a GET request to the /communities endpoint",
    });
};

export const getCommunity = async (req: Request, res: Response) => {
  console.log(req.params.id);
  res.status(200).json({
    success: true,
    message: "You've made a GET request to the /communities/:id endpoint",
  });
};

export const postCommunity = async (req: Request, res: Response) => {
  console.log(req.body);
  res.status(200).json({
    success: true,
    message: "You've made a POST request to the /communities endpoint",
  });
};

export const patchCommunity = async (req: Request, res: Response) => {
  console.log(req.params.id);
  res.status(200).json({
    success: true,
    message: "You've made a PATCH request to the /communities endpoint",
  });
};

export const deleteCommunity = async (req: Request, res: Response) => {
  console.log(req.params.id);
  res.status(200).json({
    success: true,
    message: "You've made a DELETE request to the /communities/:id endpoint",
  });
};
