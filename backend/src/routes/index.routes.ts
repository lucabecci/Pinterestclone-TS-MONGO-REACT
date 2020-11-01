import { IRouter, Router } from "express";
const router: IRouter = Router();
import { index, usage } from "../controllers/index.controller";

router.get("/", index);
router.get("/usage", usage);

export default router;
