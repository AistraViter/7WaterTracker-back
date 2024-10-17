import { waterNotesCollection } from "../db/models/waterNotes.js";

export const getWaterNotes = async (userId) => {
    const water = waterNotesCollection.find(userId);
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

export const updateWaterNoteById = async (waterId, userId, updatedData) => {

    const existingWaterNote = await waterNotesCollection.findById({_id: waterId, userId});

    if (!existingWaterNote) {
        return null;  
    }

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
    const water = await waterNotesCollection.findOneAndDelete({_id: waterId, userId});
    return water;
};
