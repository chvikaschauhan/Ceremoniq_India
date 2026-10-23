import { Router } from "express";
import { savePackageCustomization } from "../controllers/packageController.js";

const router = Router();
router.post("/", savePackageCustomization);
export default router;
