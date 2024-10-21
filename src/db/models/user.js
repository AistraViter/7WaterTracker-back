import { model, Schema } from 'mongoose';

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
    dailyNorm: {
      type: Number,
      default: 1500,
    },
    gender: {
      type: String,
      enum: ['Woman', 'Man'],
      default: 'Woman',
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}; //потрібно для видалення паролю

const UsersCollection = model('users', userSchema);
export { UsersCollection }; // Використовуйте іменованный експорт

// Цей файл перевірено 19.10.2024 22.01 by AistraViter
