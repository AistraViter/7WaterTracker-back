import { model, Schema } from 'mongoose';
import { handleSaveError, setUpdateOptions } from './hooks.js';

const waterSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    dailyNorma: {
      type: Number,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

waterSchema.post('save', handleSaveError);

waterSchema.pre('findOneAndUpdate', setUpdateOptions);

export const WaterCollection = model('water', waterSchema);