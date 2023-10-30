import { User } from './user';

export type WithId = {
  id: string;
};

export type ProductNoId = {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity: number;
  rating: {
    rate: number;
    count: number;
  };
  author: User;
};

export type Product = WithId & ProductNoId;
