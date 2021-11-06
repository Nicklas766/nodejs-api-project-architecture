const createArtistDAO = (artists) => Object.freeze({
  getAll: async () => [...artists.values()],
  getById: async (id) => {
    const artist = artists.get(id);

    if (artist) {
      return artist;
    }

    throw new Error('Artist not found!');
  },
  create: async ({ name, team }) => {
    if (name.length < 2) {
      throw new Error('Name requires more than 2 characters!');
    }

    const id = artists.size + 1;
    artists.set(id, { id, name, team });
  },
});

export default createArtistDAO;
