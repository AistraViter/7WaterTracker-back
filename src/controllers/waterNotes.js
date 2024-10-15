import { getWaterNotes } from "../services/waterNotes.js";

export const getWaterNotesController = async (req, res) => {
    const waterUser = await getWaterNotes();

    res.status(200).json({
        message: 'Successfully found all your water notes!',
        data: waterUser,
      });
};
