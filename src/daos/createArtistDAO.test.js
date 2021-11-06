import createArtistDOA, { Artist } from './createArtistDAO';
import db from '../db';

const artist = createArtistDOA(Artist);

afterAll(async () => {
  await db.close();
});
beforeEach(async () => {
  await db.sync({ force: true });
  await Artist.bulkCreate([
    {
      id: 1,
      name: 'Jason Mraz',
    },
    {
      id: 2,
      name: 'Veronica Maggio',
    },
  ]);
});

describe('#getById', () => {
  it('should return correct artist - Jason Mraz', async () => {
    const fetchedArtist = await artist.getById(1);
    expect(fetchedArtist).toMatchObject({
      id: 1,
      name: 'Jason Mraz',
    });
  });

  it('should return correct artist - Veronica Maggio', async () => {
    const fetchedArtist = await artist.getById(2);
    expect(fetchedArtist).toMatchObject({
      id: 2,
      name: 'Veronica Maggio',
    });
  });

  it('should throw an error when artist not found', async () => {
    await expect(artist.getById(3))
      .rejects
      .toThrow('Artist not found!');
  });
});

describe('#create', () => {
  it('should create a new artist', async () => {
    await artist.create({
      id: 3,
      name: 'John Mayer',
    });
    const allArtists = await artist.getAll();

    expect(allArtists).toMatchObject([
      {
        id: 1,
        name: 'Jason Mraz',
      },
      {
        id: 2,
        name: 'Veronica Maggio',
      },
      {
        id: 3,
        name: 'John Mayer',
      },
    ]);
  });

  it('should throw an error when artist name is lower than 3', async () => {
    await expect(artist.getById(3))
      .rejects
      .toThrow('Artist not found!');
  });
});
