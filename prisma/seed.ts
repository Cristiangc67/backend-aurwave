import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Artist
  const artist = await prisma.artist.create({
    data: {
      name: 'The Example Band',
      genre: 'Rock',
      bio: 'A great band for testing.',
      image_url: 'https://example.com/artist.jpg',
    },
  });

  // Create Album
  const album = await prisma.album.create({
    data: {
      title: 'Greatest Hits',
      artist_id: artist.id,
      release_date: new Date(),
      cover_url: 'https://example.com/cover.jpg',
    },
  });

  // Create Songs
  const song1 = await prisma.song.create({
    data: {
      title: 'Song One',
      artist_id: artist.id,
      album_id: album.id,
      duration: 180,
      file_url: 'https://example.com/song1.mp3',
    },
  });

  const song2 = await prisma.song.create({
    data: {
      title: 'Song Two',
      artist_id: artist.id,
      album_id: album.id,
      duration: 200,
      file_url: 'https://example.com/song2.mp3',
    },
  });

  console.log({ artist, album, song1, song2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
