import { Schema, model } from 'mongoose';
import { Purchase } from '../entities/purchase';

const purchaseSchema = new Schema<Purchase>({
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
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
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

purchaseSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const PurchaseModel = model('Purchase', purchaseSchema, 'purchases');
