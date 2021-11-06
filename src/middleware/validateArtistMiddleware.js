export const isValidArtist = (body) => {
  if (!body.name) {
    return false;
  }

  return true;
};

const validateArtistMiddleware = (req, res, next) => {
  if (isValidArtist(req.body)) {
    return next();
  }

  return res.status(400).send('Bad Request - parameters are missing');
};

export default validateArtistMiddleware;
