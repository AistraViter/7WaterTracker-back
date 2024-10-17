import { Schema, model } from "mongoose";

const setTimeToSevenAM = () => {
    const now = new Date();
    now.setHours(10, 0, 0, 0); // Встановлюємо час на 7:00:00.000
    return now;
};

const waterNotes = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            required: [true, 'User ID is required'],
            ref: 'users',
        },
        waterVolume: {
            type: Number,
            required: true,
            min: 1,
            max: 5000,
            default: 50
        },
        date: {
            type: Date,
            default: () => setTimeToSevenAM(),
            // required: true,
        }
    },
    { timestamps: true, versionKey: false },
);

export const waterNotesCollection = model('water-notes', waterNotes);



