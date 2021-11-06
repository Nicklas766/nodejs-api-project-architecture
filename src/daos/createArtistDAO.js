import { DataTypes } from 'sequelize';
import db from '../db';

export const Artist = db.define('Artist', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING, // VARCHAR(255)
    allowNull: false,
  },
  team: {
    type: DataTypes.STRING,

  },
});

export default (ArtistModel) => {
  const getAll = async () => ArtistModel.findAll();

  const getById = async (id) => {
    const artist = await ArtistModel.findOne({ where: { id } });

    if (artist) {
      return artist;
    }

    throw new Error('Artist not found!');
  };

  const create = async ({ name, team }) => {
    if (name.length < 2) {
      throw new Error('Name requires more than 2 characters!');
    }

    const id = (await ArtistModel.count()) + 1;

    await ArtistModel.create({ id, name, team });
  };

  return Object.freeze({
    getAll,
    getById,
    create,
  });
};
