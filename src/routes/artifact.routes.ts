import { Router } from "express";
import { artifactController } from "../controllers/artifact.controller";
import { validateRequest } from "../middlewares/validate.middleware";
import { artifactQuerySchema } from "../validations/artifact.validation";

const router = Router();

// Public routes for artifacts
router.get("/", validateRequest(artifactQuerySchema, "query"), artifactController.getAllArtifacts);
router.get("/:id", artifactController.getArtifactById);

export default router;
