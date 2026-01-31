import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllArtists = async (req: Request, res: Response) => {
  try {
    const artists = await prisma.artist.findMany();
    res.json(artists);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getArtistById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const artist = await prisma.artist.findUnique({
      where: { id: Number(id) },
      include: { albums: true, songs: true },
    });
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
    res.json(artist);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createArtist = async (req: Request, res: Response) => {
  try {
    const { name, genre, bio, image_url } = req.body;
    const artist = await prisma.artist.create({
      data: { name, genre, bio, image_url },
    });
    res.status(201).json(artist);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
