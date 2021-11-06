const createArtistService = ({ artistDAO, teamService }) => {
  const getAll = async () => artistDAO.getAll();

  const getById = async (id) => artistDAO.getById(id);

  const createArtist = async (artistDTO) => artistDAO.create({
    name: artistDTO.name,
    team: await teamService.getTeam(),
  });

  return Object.freeze({
    getAll,
    getById,
    createArtist,
  });
};

export default createArtistService;
