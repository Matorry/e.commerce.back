import { Product } from '../entities/product.js';
import { HttpError } from '../types/http.error.js';
import { ProductModel } from './product.mongo.model.js';
import { Repository } from './repository.js';
export class ProductMongoRepository implements Repository<Product> {
  async getAll(): Promise<Product[]> {
    const data = await ProductModel.find().exec();
    return data;
  }

  async get(id: string): Promise<Product> {
    const data = await ProductModel.findById(id).exec();
    if (!data)
      throw new HttpError(404, 'Not Found', 'User not found in file system', {
        cause: 'Trying getById',
      });
    return data;
  }

  async post(newData: Omit<Product, 'id'>): Promise<Product> {
    const data = await ProductModel.create(newData);
    return data;
  }

  async patch(id: string, newData: Partial<Product>): Promise<Product> {
    const data = await ProductModel.findByIdAndUpdate(id, newData, {
      new: true,
    }).exec();
    if (!data)
      throw new HttpError(
        404,
        'Not Found',
        'Product not found in file system',
        {
          cause: 'Trying update',
        }
      );
    return data;
  }

  async delete(id: string): Promise<void> {
    const result = await ProductModel.findByIdAndDelete(id).exec();
    if (!result)
      throw new HttpError(
        404,
        'Not Found',
        'Product not found in file system',
        {
          cause: 'Trying delete',
        }
      );
  }

  async search({
    key,
    value,
  }: {
    key: string;
    value: unknown;
  }): Promise<Product[]> {
    const data = await ProductModel.find({ [key]: value }).exec();
    return data;
  }
}
