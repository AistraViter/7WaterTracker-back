import { waterNotesCollection } from '../db/models/waterNotes.js';

export const getWaterNotes = async (userId) => {
<<<<<<< Updated upstream
    const water = waterNotesCollection.find(userId);
    return water;
=======
  const water = waterNotesCollection.find(userId);
  return water;
};

export const getWaterNotesInRange = async (userId, startDate, endDate) => {
  return waterNotesCollection.find({
    userId,
    date: { $gte: startDate, $lt: endDate },
  });
>>>>>>> Stashed changes
};

export const getWaterNoteById = async (waterId) => {
  const water = await waterNotesCollection(waterId);
  return water;
};

export const postWaterNotes = async (payload) => {
  const water = await waterNotesCollection.create(payload);
  return water;
};

export const updateWaterNoteById = async (waterId, userId, updatedData) => {
<<<<<<< Updated upstream

    const existingWaterNote = await waterNotesCollection.findById({_id: waterId, userId});

    if (!existingWaterNote) {
        return null;  
    }
=======
  const existingWaterNote = await waterNotesCollection.findById({
    _id: waterId,
    userId,
  });

  if (!existingWaterNote) {
    return null;
  }
>>>>>>> Stashed changes

  if (updatedData.waterVolume !== undefined) {
    existingWaterNote.waterVolume = updatedData.waterVolume;
  }

  if (updatedData.date !== undefined) {
    existingWaterNote.date = updatedData.date;
  }

  const savedWaterNote = await existingWaterNote.save();

  return savedWaterNote;
};

export const deleteWaterNotes = async (waterId, userId) => {
<<<<<<< Updated upstream
    const water = await waterNotesCollection.findOneAndDelete({_id: waterId, userId});
    return water;
=======
  const water = await waterNotesCollection.findOneAndDelete({
    _id: waterId,
    userId,
  });
  return water;
>>>>>>> Stashed changes
};
