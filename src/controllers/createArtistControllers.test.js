import createArtistDAO, { Artist } from '../daos/createArtistDAO';
import teamService from '../services/teamService';
import createArtistService from '../services/createArtistService';
import createArtistControllers from './createArtistControllers';
import db from '../db';

const artistControllers = createArtistControllers({
  artistService: createArtistService({
    artistDAO: createArtistDAO(Artist),
    teamService,
  }),
});

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

describe('#getArtists', () => {
  it('should return all artists', async () => {
    const req = {};
    const res = { json: jest.fn() };

    await artistControllers.getArtists(req, res);
    expect(res.json.mock.calls[0][0]).toMatchObject([
      { id: 1, name: 'Jason Mraz' },
      { id: 2, name: 'Veronica Maggio' },
    ]);
  });
});
