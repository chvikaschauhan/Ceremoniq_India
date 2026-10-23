import { Router } from "express";
import { createRecommendations } from "../controllers/recommendationsController.js";

const router = Router();

router.post("/", createRecommendations);

export default router;
