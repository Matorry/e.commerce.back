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
  rating: {
    rate: number;
    count: number;
  };
  author: User;
};

export type Product = WithId & ProductNoId;
