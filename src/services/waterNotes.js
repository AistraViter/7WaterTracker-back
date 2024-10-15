import { waterNotesCollection } from "../db/models/waterNotes.js";

export const getWaterNotes = async () => {
const user = waterNotesCollection.find();
return user;
};

// export const postWaterNotes = async () => {

// }

// export const patchWaterNotes = async () => {

// }

// export const deleteWaterNotes = async () => {

// }
