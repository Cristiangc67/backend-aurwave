import { Router } from 'express';
import { getAllSongs, getSongById, createSong, searchSongs } from '../controllers/songController';

const router = Router();

router.get('/', getAllSongs);
router.get('/search', searchSongs); // Search must be before :id to avoid conflict
router.get('/:id', getSongById);
router.post('/', createSong);

export default router;
