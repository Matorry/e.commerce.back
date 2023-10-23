import { Product } from './product';
import { User } from './user';

export type WithId = {
  id: string;
};

export type PurchaseNoId = {
  products: Product[];
  date: string;
  amount: string;
  isOpen: boolean;
  author: User;
};

export type Purchase = WithId & PurchaseNoId;
