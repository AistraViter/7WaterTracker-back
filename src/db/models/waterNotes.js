import { Schema, model } from "mongoose";

const waterNotes = new Schema(
    {
        waterVolume: {
            type: Number,
            required: true,
            min: 1,
            max: 5000,
            default: 50
        },
        date: {
            type: Date,
            required: true,
        }
    },
    { timestamps: true, versionKey: false },
);

export const waterNotesCollection = model('water_notes', waterNotes);
