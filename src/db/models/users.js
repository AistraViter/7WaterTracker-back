import { model, Schema } from 'mongoose';

const usersSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  dailyNorm: { type: Number, default: 1500 },
  gender: {
    type: String,
    required: true,
    enum: ['woman', 'man'],
    default: 'woman',
  },
  password: { type: String, required: true },
  avatarUrl: { type: String, required: false },
  userId: { type: Schema.Types.ObjectId, ref: 'users' },
});

export const UsersCollection = model('users', usersSchema);
