import mongoose from 'mongoose';
import createArtistDTO from '../dtos/createArtistDTO';

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: Number, required: true },
  team: { type: String },
});

export const artistModel = mongoose.model('artist', artistSchema);

export default (ArtistModel) => {
  const getAll = async () => (await ArtistModel.find()).map(createArtistDTO);

  const getById = async (id) => {
    const artist = await ArtistModel.findOne({ id });

    if (artist) {
      return createArtistDTO(artist);
    }

    throw new Error('Artist not found!');
  };

  const create = async ({ name, team }) => {
    if (name.length < 2) {
      throw new Error('Name requires more than 2 characters!');
    }

    const id = (await ArtistModel.countDocuments()) + 1;

    const artistDoc = new ArtistModel({ id, name, team });
    await artistDoc.save();
  };

  return Object.freeze({
    getAll,
    getById,
    create,
  });
};
