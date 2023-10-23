import { Purchase } from '../entities/purchase.js';
import { HttpError } from '../types/http.error.js';
import { PurchaseModel } from './purchase.mongo.model.js';
import { Repository } from './repository.js';
export class PurchaseMongoRepository implements Repository<Purchase> {
  async getAll(): Promise<Purchase[]> {
    const data = await PurchaseModel.find().exec();
    return data;
  }

  async get(id: string): Promise<Purchase> {
    const data = await PurchaseModel.findById(id).exec();
    if (!data)
      throw new HttpError(404, 'Not Found', 'User not found in file system', {
        cause: 'Trying getById',
      });
    return data;
  }

  async post(newData: Omit<Purchase, 'id'>): Promise<Purchase> {
    const data = await PurchaseModel.create(newData);
    return data;
  }

  async patch(id: string, newData: Partial<Purchase>): Promise<Purchase> {
    const data = await PurchaseModel.findByIdAndUpdate(id, newData, {
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
    const result = await PurchaseModel.findByIdAndDelete(id).exec();
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
  }): Promise<Purchase[]> {
    const data = await PurchaseModel.find({ [key]: value }).exec();
    return data;
  }
}
