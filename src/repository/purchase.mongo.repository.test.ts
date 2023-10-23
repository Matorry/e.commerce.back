import { User } from '../entities/user.js';
import { PurchaseModel } from './purchase.mongo.model.js';
import { PurchaseMongoRepository } from './purchase.mongo.repository.js';
jest.mock('fs/promises');
describe('Given the class PurchaseMongoRepository', () => {
  const mockDataNoId = {
    products: [],
    date: 'test',
    amount: 'test',
    isOpen: false,
    author: {} as User,
  };
  describe('When i instance it', () => {
    const mockPurchase = {
      id: '1',
      products: [],
      date: 'test',
      amount: 'test',
      isOpen: false,
      author: {} as User,
    };

    PurchaseModel.find = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue([]) });
    PurchaseModel.findById = jest.fn().mockReturnValueOnce({
      populate: jest.fn().mockReturnValue({}),
      exec: jest.fn().mockResolvedValueOnce({}),
    });
    PurchaseModel.create = jest.fn().mockReturnValue(mockPurchase);
    PurchaseModel.findByIdAndUpdate = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(mockPurchase) });
    PurchaseModel.findByIdAndDelete = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue('ok') });
    const repo = new PurchaseMongoRepository();
    test('Then getAll should return data', async () => {
      const result = await repo.getAll();
      expect(result).toEqual([]);
    });
    test('Then get should return data', async () => {
      const result = await repo.get('');
      expect(result).toEqual({});
    });
    test('Then patch should return data', async () => {
      const result = await repo.patch(mockPurchase.id, mockDataNoId);
      expect(result).toEqual(mockPurchase);
    });
    test('Then delete should return data', async () => {
      const result = await repo.delete(mockPurchase.id);
      expect(result).toEqual(undefined);
    });
    test('Then post should return data', async () => {
      const result = await repo.post(mockDataNoId);
      expect(result).toEqual(mockPurchase);
    });
    test('Then search should return data', async () => {
      const result = await repo.search({ key: '', value: '' });
      expect(result).toEqual([]);
    });
  });
  describe('When i instance it', () => {
    const repo = new PurchaseMongoRepository();
    test('Then get should return error', async () => {
      const mockExec = jest.fn().mockResolvedValue(null);
      PurchaseModel.findById = jest.fn().mockReturnValue({
        exec: mockExec,
      });
      expect(repo.get('')).rejects.toThrow();
    });
    test('Then patch should return error', async () => {
      const mockExec = jest.fn().mockResolvedValue(null);
      PurchaseModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: mockExec,
      });
      expect(repo.patch('', mockDataNoId)).rejects.toThrow();
    });
    test('Then delete should return error', async () => {
      const mockExec = jest.fn().mockResolvedValue(null);
      PurchaseModel.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: mockExec,
      });
      expect(repo.delete('')).rejects.toThrow();
    });
  });
  describe('When i instance it', () => {
    test('toJSON method should transform the returned object', () => {
      const userData = {
        username: 'testuser',
        password: 'password123',
      };
      const user = new PurchaseModel(userData);
      const userObject = user.toJSON();
      expect(userObject).not.toHaveProperty('_id');
      expect(userObject).not.toHaveProperty('__v');
      expect(userObject).not.toHaveProperty('password');
      expect(userObject).toHaveProperty('id');
    });
  });
});
