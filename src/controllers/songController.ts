import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllSongs = async (req: Request, res: Response) => {
  try {
    const songs = await prisma.song.findMany({
      include: { artist: true, album: true },
    });
    res.json(songs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getSongById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const song = await prisma.song.findUnique({
      where: { id: Number(id) },
      include: { artist: true, album: true },
    });
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json(song);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createSong = async (req: Request, res: Response) => {
  try {
    const { title, artist_id, album_id, duration, file_url } = req.body;
    const song = await prisma.song.create({
      data: {
        title,
        artist_id: Number(artist_id),
        album_id: album_id ? Number(album_id) : null,
        duration,
        file_url,
      },
    });
    res.status(201).json(song);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const searchSongs = async (req: Request, res: Response) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: 'Query parameter q is required' });
    }
    const songs = await prisma.song.findMany({
      where: {
        OR: [
          { title: { contains: String(q), mode: 'insensitive' } },
          { artist: { name: { contains: String(q), mode: 'insensitive' } } },
        ],
      },
      include: { artist: true },
    });
    res.json(songs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
