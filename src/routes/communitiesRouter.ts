import { Router } from "express";
import * as CommunitiesController from "../controllers/communitiesController";

const communitiesRouter: Router = Router();

communitiesRouter.get("/communities", CommunitiesController.getCommunities);
communitiesRouter.get("/communities/:id", CommunitiesController.getCommunity);
communitiesRouter.post("/communities", CommunitiesController.postCommunity);
communitiesRouter.patch(
  "/communities/:id",
  CommunitiesController.patchCommunity
);
communitiesRouter.delete(
  "/communities/:id",
  CommunitiesController.deleteCommunity
);

export default communitiesRouter;
