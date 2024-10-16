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
      lowercase: true, // Що дає нам це поле, а також поле матч? Навіщо така жорстка перевірка мейлу?
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'], //?
    },
    password: {
      type: String,
      required: true,
    },
    dailyNorm: { type: Number, default: 1500 },
    gender: {
      type: String,
      enum: ['Woman', 'Man'],
      default: 'Woman', //На макеті по дефолту вумен, і на лекції казали так робити
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

const User = mongoose.model('User', userSchema);
export { User }; // Используйте именованный экспорт
