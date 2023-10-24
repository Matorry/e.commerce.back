import { Schema, model } from 'mongoose';
import { User } from '../entities/user.js';

const userSchema = new Schema<User>({
  userName: {
    type: String,
    required: true,
    unique: true,
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
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  addressStreet: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  purchaseHistory: [
    {
      products: [
        {
          title: {
            type: String,
            required: true,
          },
          id: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          description: {
            type: String,
            required: true,
          },
          category: {
            type: String,
            required: true,
          },
          image: {
            type: String,
            required: true,
          },
          rating: {
            rate: {
              type: Number,
              required: true,
            },
            count: {
              type: Number,
              required: true,
            },
          },
        },
      ],
      date: {
        type: String,
        required: true,
      },
      amount: {
        type: String,
        required: true,
      },
      isOpen: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

userSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

export const UserModel = model('User', userSchema, 'users');
