import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createPlaylist = async (req: Request, res: Response) => {
  try {
    const { user_id, name, description, is_public } = req.body;
    const playlist = await prisma.playlist.create({
      data: {
        user_id: Number(user_id),
        name,
        description,
        is_public,
      },
    });
    res.status(201).json(playlist);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserPlaylists = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const playlists = await prisma.playlist.findMany({
      where: { user_id: Number(userId) },
      include: {
  songs: {
    orderBy: { position: 'asc' },
    include: {
      song: {
        include: {
          artist: true,
          album: true,
        },
      },
    },
  },
  user: { select: { id: true, username: true } },
}

    });
    res.json(playlists);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPlaylistById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const playlist = await prisma.playlist.findUnique({
    where: { id: Number(id) },
    include: {
      songs: {
        orderBy: { position: 'asc' },
        include: {
          song: {
            include: {
              artist: true,
              album: true,
            },
          },
        },
      },
      user: {
        select: { id: true, username: true },
      },
    },
  });

  if (!playlist) {
    return res.status(404).json({ message: 'Playlist not found' });
  }

  res.json(playlist);
};


export const addSongToPlaylist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { song_id } = req.body;

    const last = await prisma.playlistSong.findFirst({
      where: { playlist_id: Number(id) },
      orderBy: { position: 'desc' },
    });

    const nextPosition = last ? last.position + 1 : 1;

    await prisma.playlistSong.create({
      data: {
        playlist_id: Number(id),
        song_id: Number(song_id),
        position: nextPosition,
      },
    });

    res.status(201).json({ message: 'Song added to playlist' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export const removeSongFromPlaylist = async (req: Request, res: Response) => {
  try {
    const { id, songId } = req.params;

    await prisma.playlistSong.deleteMany({
      where: {
        playlist_id: Number(id),
        song_id: Number(songId),
      },
    });

    res.json({ message: 'Song removed from playlist' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

