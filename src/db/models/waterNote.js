import { model, Schema } from 'mongoose';
import { handleSaveError } from '../hooks/handleSaveError.js';
import { setUpdateOptions } from '../hooks/setUpdateOptions.js';
import { setDailyNorm } from '../hooks/setDailyNorm.js';

const waterSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    dailyNorm: {
      type: Number,
      ref: 'users',
    },
    waterVolume: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

waterSchema.pre('save', setDailyNorm);
waterSchema.post('save', handleSaveError);
waterSchema.pre('findOneAndUpdate', setUpdateOptions);

export const WaterCollection = model('water', waterSchema);
