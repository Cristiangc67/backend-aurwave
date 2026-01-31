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
      include: { songs: { include: { artist: { select: { id: true, name: true } }, album: { select: { id: true, title: true, cover_url: true } } } }, user: { select: { id: true, username: true } } },
    });
    res.json(playlists);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getPlaylistById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const playlist = await prisma.playlist.findUnique({
      where: { id: Number(id) },
      include: { songs: { include: { artist: true, album: true } }, user: { select: { id: true, username: true } } },
    });
    if (!playlist) {
      return res.status(404).json({ message: 'Playlist not found' });
    }
    res.json(playlist);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const addSongToPlaylist = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { song_id } = req.body;

    const playlist = await prisma.playlist.update({
      where: { id: Number(id) },
      data: {
        songs: {
          connect: { id: Number(song_id) },
        },
      },
      include: { songs: true },
    });
    res.json(playlist);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const removeSongFromPlaylist = async (req: Request, res: Response) => {
  try {
    const { id, songId } = req.params;

    const playlist = await prisma.playlist.update({
      where: { id: Number(id) },
      data: {
        songs: {
          disconnect: { id: Number(songId) },
        },
      },
      include: { songs: true },
    });
    res.json(playlist);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
