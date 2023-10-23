import { PurchaseController } from '../controller/purchase.controller';
import { PurchaseRouter } from './purchase.router';

describe('Given UsersRouter', () => {
  describe('When we instantiate it', () => {
    jest.spyOn(Function.prototype, 'bind');
    const controller = {
      getAll: jest.fn(),
      get: jest.fn(),
      login: jest.fn(),
      post: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
    } as unknown as PurchaseController;
    const router = new PurchaseRouter(controller);
    test('Then it should ...', () => {
      expect(router).toBeInstanceOf(PurchaseRouter);
      expect(Function.prototype.bind).toHaveBeenCalledTimes(6);
    });
  });
});
