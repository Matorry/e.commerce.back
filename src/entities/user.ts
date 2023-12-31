import { Product } from './product';

export type WithId = {
  id: string;
};
export type LoginData = {
  userName: string;
  password: string;
};

type Purchase = {
  products: Product[];
  date: string;
  amount: string;
  isOpen: boolean;
  author: User;
};

export type UserNoId = LoginData & {
  firstName: string;
  lastName: string;
  email: string;
  addressStreet: string;
  postalCode: string;
  city: string;
  purchaseHistory: Purchase[];
  role: string;
};
export type User = WithId & UserNoId;
