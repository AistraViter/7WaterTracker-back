import { waterNotesCollection } from "../db/models/waterNotes.js";

export const getWaterNotes = async () => {
    const water = waterNotesCollection.find();
    return water;
};

export const getWaterNoteById = async (waterId) => {
  const water = await waterNotesCollection(waterId);
  return water;
};

export const postWaterNotes = async (payload) => {
    const water = await waterNotesCollection.create(payload);
    return water;
};

export const updateWaterNoteById = async (waterId, updatedData) => {

    const existingWaterNote = await waterNotesCollection.findById(waterId);

    if (updatedData.waterVolume !== undefined) {
        existingWaterNote.waterVolume = updatedData.waterVolume;
    }

    if (updatedData.date !== undefined) {
        existingWaterNote.date = updatedData.date;
    }

    const savedWaterNote = await existingWaterNote.save();

    return savedWaterNote;
};

export const deleteWaterNotes = async (waterId) => {
    const water = await waterNotesCollection.findOneAndDelete({_id: waterId});
    return water;
};
