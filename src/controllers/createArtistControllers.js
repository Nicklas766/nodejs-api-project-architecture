import createArtistDTO from '../dtos/createArtistDTO';

const createArtistsControllers = ({ artistService }) => {
  const getArtists = async (req, res) => {
    const artists = await artistService.getAll();
    return res.json(artists);
  };

  const createArtist = async (req, res) => {
    const artistDTO = createArtistDTO(req.body);

    try {
      await artistService.createArtist(artistDTO);
      return res.status(200).send();
    } catch {
      return res.status(500).send();
    }
  };

  return Object.freeze({
    getArtists,
    createArtist,
  });
};

export default createArtistsControllers;
