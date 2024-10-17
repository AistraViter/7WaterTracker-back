import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
<<<<<<< Updated upstream
=======
    dailyNorm: {
      type: Number,
      default: 1500
    },
>>>>>>> Stashed changes
    gender: {
      type: String,
      enum: ['Woman', 'Man'],
      default: 'Man',
      required: true,
    },
    photo: {
      type: String,
      default: null, 
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

<<<<<<< Updated upstream
export const User = mongoose.model('User', userSchema);

=======
const User = mongoose.model('users', userSchema);
export { User }; // Используйте именованный экспорт
>>>>>>> Stashed changes
