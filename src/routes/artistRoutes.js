import express from 'express';
import createArtistDAO, { artistModel } from '../daos/createArtistDAO';
import teamService from '../services/teamService';
import createArtistService from '../services/createArtistService';
import createArtistControllers from '../controllers/createArtistControllers';
import validateArtistMiddleware from '../middleware/validateArtistMiddleware';

const router = express.Router();
const artistControllers = createArtistControllers({
  artistService: createArtistService({
    artistDAO: createArtistDAO(artistModel),
    teamService,
  }),
});

router.post('/artists/new', validateArtistMiddleware, artistControllers.createArtist);

export default router;
