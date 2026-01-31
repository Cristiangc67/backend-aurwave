import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PORT } from './config/env';

dotenv.config();

const app = express();
const port = PORT || 3000;

import authRoutes from './routes/authRoutes';
import artistRoutes from './routes/artistRoutes';
import songRoutes from './routes/songRoutes';
import playlistRoutes from './routes/playlistRoutes';

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/playlists', playlistRoutes);

app.get('/', (req, res) => {
  res.send('Spotify-like Backend API is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
