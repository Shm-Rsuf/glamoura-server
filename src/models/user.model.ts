import mongoose, { Schema, model } from 'mongoose';
import { userType } from '../types/user.type';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new Schema<userType>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    photoUrl: {
      type: String,
      required: true,
    },

    address: {
      type: String,
    },

    phoneNumber: {
      type: String,
    },

    role: {
      enum: ['user', 'admin'],
      default: 'user',
      type: String,
      required: true,
    },

    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
      },
    ],
  },
  {
    timestamps: true,
  }
);

/* register for user */
userSchema.statics.register = async function (
  name,
  email,
  password,
  photoUrl,
  address,
  phoneNumber
): Promise<userType> {
  if (!name || !email || !password || !photoUrl) {
    throw new Error('must be filled name, email, password, photoUrl');
  }

  const existingEmail = await this.findOne({ email });
  if (existingEmail) {
    throw new Error('email already exist');
  }

  if (!validator.isEmail(email)) {
    throw new Error('invalid email');
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      'password is not strong. It should be at least 8 characters, use both uppercase and lowercase letters, include at least one number, and have one special character.'
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hashPassword,
    photoUrl,
    address,
    phoneNumber,
  });

  return user;
};

const UserModel = model<userType>('User', userSchema);
export default UserModel;
