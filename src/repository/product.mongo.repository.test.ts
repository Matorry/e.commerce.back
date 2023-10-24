import { User } from '../entities/user.js';
import { ProductModel } from './product.mongo.model.js';
import { ProductMongoRepository } from './product.mongo.repository.js';
jest.mock('fs/promises');
describe('Given the class FilmMongoRepository', () => {
  const mockDataNoId = {
    title: 'test',
    price: 1,
    description: 'test',
    category: 'test',
    image: 'test',
    rating: {
      rate: 1,
      count: 1,
    },
    author: {} as User,
  };
  describe('When i instance it', () => {
    const mockProduct = {
      id: '1',
      title: 'test',
      price: 1,
      description: 'test',
      category: 'test',
      image: 'test',
      rating: {
        rate: 1,
        count: 1,
      },
      author: {} as User,
    };

    ProductModel.find = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue([]) });
    ProductModel.findById = jest.fn().mockReturnValueOnce({
      populate: jest.fn().mockReturnValue({}),
      exec: jest.fn().mockResolvedValueOnce({}),
    });
    ProductModel.create = jest.fn().mockReturnValue(mockProduct);
    ProductModel.findByIdAndUpdate = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(mockProduct) });
    ProductModel.findByIdAndDelete = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue('ok') });
    const repo = new ProductMongoRepository();
    test('Then getAll should return data', async () => {
      const result = await repo.getAll();
      expect(result).toEqual([]);
    });
    test('Then get should return data', async () => {
      const result = await repo.get('');
      expect(result).toEqual({});
    });
    test('Then patch should return data', async () => {
      const result = await repo.patch(mockProduct.id, mockDataNoId);
      expect(result).toEqual(mockProduct);
    });
    test('Then delete should return data', async () => {
      const result = await repo.delete(mockProduct.id);
      expect(result).toEqual(undefined);
    });
    test('Then post should return data', async () => {
      const result = await repo.post(mockDataNoId);
      expect(result).toEqual(mockProduct);
    });
    test('Then search should return data', async () => {
      const result = await repo.search({ key: '', value: '' });
      expect(result).toEqual([]);
    });
  });
  describe('When i instance it', () => {
    const repo = new ProductMongoRepository();
    test('Then get should return error', async () => {
      const mockExec = jest.fn().mockResolvedValue(null);
      ProductModel.findById = jest.fn().mockReturnValue({
        exec: mockExec,
      });
      expect(repo.get('')).rejects.toThrow();
    });
    test('Then patch should return error', async () => {
      const mockExec = jest.fn().mockResolvedValue(null);
      ProductModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: mockExec,
      });
      expect(repo.patch('', mockDataNoId)).rejects.toThrow();
    });
    test('Then delete should return error', async () => {
      const mockExec = jest.fn().mockResolvedValue(null);
      ProductModel.findByIdAndDelete = jest.fn().mockReturnValue({
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
      const user = new ProductModel(userData);
      const userObject = user.toJSON();
      expect(userObject).not.toHaveProperty('_id');
      expect(userObject).not.toHaveProperty('__v');
      expect(userObject).not.toHaveProperty('password');
      expect(userObject).toHaveProperty('id');
    });
  });
});
