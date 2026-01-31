import { Router } from 'express';
import { createPlaylist, getUserPlaylists, getPlaylistById, addSongToPlaylist, removeSongFromPlaylist } from '../controllers/playlistController';

const router = Router();

router.post('/', createPlaylist);
router.get('/user/:userId', getUserPlaylists);
router.get('/:id', getPlaylistById);
router.post('/:id/songs', addSongToPlaylist);
router.delete('/:id/songs/:songId', removeSongFromPlaylist);

export default router;
