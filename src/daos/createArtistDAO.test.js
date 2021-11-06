import createArtistDAO from './createArtistDAO';

const artists = new Map();
const artist = createArtistDAO(artists);

afterEach(() => artists.clear());
beforeEach(() => {
  artists.set(1, { id: 1, name: 'Jason Mraz' });
  artists.set(2, { id: 2, name: 'Veronica Maggio' });
});

describe('#getAll', () => {
  it('should return all artists', async () => {
    const fetchedArtists = await artist.getAll();
    expect(fetchedArtists).toMatchObject([
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
