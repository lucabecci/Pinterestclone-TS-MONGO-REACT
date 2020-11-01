import { Router, IRouter } from "express";
const router: IRouter = Router();
import multer from "../middlewares/multer";
import {
  createImage,
  deleteImage,
  editImage,
  getImage,
  getImages,
} from "../controllers/image.controller";

router.get("/", getImages);
router.post("/", multer.single("image"), createImage);

router.get("/:id", getImage);
router.delete("/:id", deleteImage);
router.put("/:id", editImage);

export default router;
