import createArtistDAO, { artistModel } from '../daos/createArtistDAO';
import teamService from '../services/teamService';
import createArtistService from '../services/createArtistService';
import createArtistControllers from './createArtistControllers';
import dbTestHelper from '../common/db/dbTestHelper';

const artistControllers = createArtistControllers({
  artistService: createArtistService({
    artistDAO: createArtistDAO(artistModel),
    teamService,
  }),
});

afterAll(dbTestHelper.close);
beforeAll(dbTestHelper.connect);
afterEach(() => dbTestHelper.clearCollection('artists'));
beforeEach(() => dbTestHelper.addToCollection('artists', [
  {
    id: 1,
    name: 'Jason Mraz',
  },
  {
    id: 2,
    name: 'Veronica Maggio',
  },
]));

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
