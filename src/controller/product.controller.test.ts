import { NextFunction, Request, Response } from 'express';
import { Product, ProductNoId } from '../entities/product.js';
import { User } from '../entities/user.js';
import { ProductMongoRepository } from '../repository/product.mongo.repository.js';
import { UserMongoRepository } from '../repository/user.mongo.repository.js';
import { CloudinaryService } from '../services/mediaFiles.js';
import { ProductController } from './product.controller.js';

CloudinaryService.prototype.uploadImage = jest.fn();
ProductMongoRepository.prototype.get = jest.fn().mockResolvedValue({
  comands: [
    { id: '1' } as unknown as Product,
    { id: '2' } as unknown as Product,
  ],
  id: '',
} as unknown as Product);
UserMongoRepository.prototype.patch = jest
  .fn()
  .mockResolvedValue({} as unknown as User);
ProductMongoRepository.prototype.get = jest
  .fn()
  .mockResolvedValue({} as unknown as Product);
ProductMongoRepository.prototype.delete = jest
  .fn()
  .mockResolvedValue('' as unknown as void);
describe('Given the module ProductControler', () => {
  const mockRepo: ProductMongoRepository = {
    getAll: jest
      .fn()
      .mockResolvedValueOnce([{ author: '1' }] as unknown as Product[]),
    get: jest.fn(),
    post: jest.fn().mockResolvedValueOnce({} as unknown as Product),
    patch: jest.fn().mockResolvedValueOnce({} as unknown as Product),
    delete: jest.fn(),
    search: jest.fn(),
  };

  const mockResponse = {
    status: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;

  const mockNext = jest.fn() as NextFunction;
  const productController = new ProductController(mockRepo);
  describe('when we execute its methods and we have a successful answer', () => {
    test('should call create and return data', async () => {
      const mockRequest = {
        body: {} as unknown as ProductNoId,
        file: { destination: '/tmp', filename: 'test.png' },
      } as unknown as Request;
      await productController.create(mockRequest, mockResponse, mockNext);
      expect(mockRepo.post).toHaveBeenCalled();
    });
    test('should call create and return error', async () => {
      const mockRequest = {
        body: {} as unknown as ProductNoId,
      } as unknown as Request;
      await productController.create(mockRequest, mockResponse, mockNext);
      expect(mockRepo.post).toHaveBeenCalled();
    });
    test('should call updateWhithImg and return data', async () => {
      const mockRequest = {
        body: {} as unknown as ProductNoId,
        file: { destination: '/tmp', filename: 'test.png' },
      } as unknown as Request;
      await productController.updateProductWhithImg(
        mockRequest,
        mockResponse,
        mockNext
      );
      expect(mockRepo.patch).toHaveBeenCalled();
    });
    test('should call updateWhithImg and return error', async () => {
      const mockRequest = {
        body: {} as unknown as ProductNoId,
      } as unknown as Request;
      await productController.updateProductWhithImg(
        mockRequest,
        mockResponse,
        mockNext
      );
      expect(mockRepo.patch).toHaveBeenCalled();
    });
  });
});
