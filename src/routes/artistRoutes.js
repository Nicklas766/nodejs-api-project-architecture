import express from 'express';
import createArtistDAO, { Artist } from '../daos/createArtistDAO';
import teamService from '../services/teamService';
import createArtistService from '../services/createArtistService';
import createArtistControllers from '../controllers/createArtistControllers';
import validateArtistMiddleware from '../middleware/validateArtistMiddleware';

const router = express.Router();
const artistControllers = createArtistControllers({
  artistService: createArtistService({
    artistDAO: createArtistDAO(Artist),
    teamService,
  }),
});

router.post('/artists/new', validateArtistMiddleware, artistControllers.createArtist);

export default router;
