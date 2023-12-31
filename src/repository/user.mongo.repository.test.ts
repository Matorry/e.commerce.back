import { UserModel } from './user.mongo.model.js';
import { UserMongoRepository } from './user.mongo.repository.js';
jest.mock('fs/promises');
describe('Given the class FilmMongoRepository', () => {
  const mockDataNoId = {
    userName: 'test',
    email: 'test@test.com',
    password: '12345',
    firstName: 'test',
    lastName: 'test',
    addressStreet: 'test',
    postalCode: 'test',
    city: 'test',
    purchaseHistory: [],
    role: 'user',
  };
  describe('When i instance it', () => {
    const mockData = {
      id: '1',
      userName: 'test',
      email: 'test@test.com',
      password: '12345',
      firstName: 'test',
      lastName: 'test',
      addressStreet: 'test',
      postalCode: 'test',
      city: 'test',
      purchaseHistory: [],
      role: 'user',
    };

    UserModel.find = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue([]) });
    UserModel.findById = jest.fn().mockReturnValueOnce({
      populate: jest.fn().mockReturnValue({}),
      exec: jest.fn().mockResolvedValueOnce({}),
    });
    UserModel.create = jest.fn().mockReturnValue(mockData);
    UserModel.findByIdAndUpdate = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue(mockData) });
    UserModel.findByIdAndDelete = jest
      .fn()
      .mockReturnValue({ exec: jest.fn().mockResolvedValue('ok') });
    const repo = new UserMongoRepository();
    test('Then getAll should return data', async () => {
      const result = await repo.getAll();
      expect(result).toEqual([]);
    });
    test('Then get should return data', async () => {
      const result = await repo.get('');
      expect(result).toEqual({});
    });
    test('Then patch should return data', async () => {
      const result = await repo.patch(mockData.id, mockDataNoId);
      expect(result).toEqual(mockData);
    });
    test('Then delete should return data', async () => {
      const result = await repo.delete(mockData.id);
      expect(result).toEqual(undefined);
    });
    test('Then post should return data', async () => {
      const result = await repo.post(mockDataNoId);
      expect(result).toEqual(mockData);
    });
    test('Then search should return data', async () => {
      const result = await repo.search({ key: '', value: '' });
      expect(result).toEqual([]);
    });
  });
  describe('When i instance it', () => {
    const repo = new UserMongoRepository();
    test('Then get should return error', async () => {
      const mockExec = jest.fn().mockResolvedValue(null);
      UserModel.findById = jest.fn().mockReturnValue({
        exec: mockExec,
      });
      expect(repo.get('')).rejects.toThrow();
    });
    test('Then patch should return error', async () => {
      const mockExec = jest.fn().mockResolvedValue(null);
      UserModel.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: mockExec,
      });
      expect(repo.patch('', mockDataNoId)).rejects.toThrow();
    });
    test('Then delete should return error', async () => {
      const mockExec = jest.fn().mockResolvedValue(null);
      UserModel.findByIdAndDelete = jest.fn().mockReturnValue({
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
      const user = new UserModel(userData);
      const userObject = user.toJSON();
      expect(userObject).not.toHaveProperty('_id');
      expect(userObject).not.toHaveProperty('__v');
      expect(userObject).not.toHaveProperty('password');
      expect(userObject).toHaveProperty('id');
    });
  });
});
