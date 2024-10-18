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
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
    dailyNorm: {
      type: Number,
      default: 1500
    },
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
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
<<<<<<< Updated upstream
export const User = mongoose.model('User', userSchema);

=======
const User = mongoose.model('users', userSchema);
export { User }; // Используйте именованный экспорт
>>>>>>> Stashed changes
=======
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}; //потрібно для видалення паролю


const UsersCollection = mongoose.model('users', userSchema);
export { UsersCollection }; // Используйте именованный экспорт
>>>>>>> Stashed changes
