import createArtistDAO from '../daos/createArtistDAO';
import teamService from '../services/teamService';
import createArtistService from '../services/createArtistService';
import createArtistControllers from './createArtistControllers';

const artists = new Map();
const artistControllers = createArtistControllers({
  artistService: createArtistService({
    artistDAO: createArtistDAO(artists),
    teamService,
  }),
});

afterEach(() => artists.clear());
beforeEach(() => {
  artists.set(1, { id: 1, name: 'Jason Mraz' });
  artists.set(2, { id: 2, name: 'Veronica Maggio' });
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
