import { Router } from "express";
import {
  createItem,
  deleteItem,
  getAllItems,
  getItemById,
  MatchItems,
} from "../controllers/item.js";
import { authMiddelware } from "../middelware.js";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage });
router.get("/items", authMiddelware, getAllItems);
router.post("/item", authMiddelware, upload.single("media"), createItem);
router.get("/item/:id", authMiddelware, getItemById);
router.get("/match/:id", authMiddelware, MatchItems);
router.delete("/item/:id", authMiddelware, deleteItem);

export default router;
