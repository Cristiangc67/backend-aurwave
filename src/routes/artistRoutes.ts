import { Router } from 'express';
import { getAllArtists, getArtistById, createArtist } from '../controllers/artistController';

const router = Router();

router.get('/', getAllArtists);
router.get('/:id', getArtistById);
router.post('/', createArtist);

export default router;
