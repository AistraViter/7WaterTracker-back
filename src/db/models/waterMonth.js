import { Schema, model } from 'mongoose';

const waterNotesSchema = new Schema(
    {
        userId: { 
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        date: {
            type: Date, // Зберігайте дату у форматі Date
            required: true,
        },
        waterVolume: { // Додайте поле для обсягу споживаної води
            type: Number,
            required: true,
        }
    },
    { timestamps: true, versionKey: false }
);

export const waterNotesCollection = model('water-notes', waterNotesSchema);

