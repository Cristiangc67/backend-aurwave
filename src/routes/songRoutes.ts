import { Router } from "express";
import {
  getAllSongs,
  getSongById,
  createSong,
  searchSongs,
} from "../controllers/songController";

const router = Router();

router.get("/", getAllSongs);
router.get("/search", searchSongs);
router.get("/:id", getSongById);
router.post("/", createSong);

export default router;
