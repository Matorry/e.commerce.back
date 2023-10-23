import { PurchaseMongoRepository } from '../repository/purchase.mongo.repository';
import { PurchaseController } from './purchase.controller';

describe('Given the module ProductController', () => {
  describe('When i instance it', () => {
    it('Then, should create an instance of ProductController', () => {
      const repo = new PurchaseMongoRepository();
      const controller = new PurchaseController(repo);

      expect(controller).toBeInstanceOf(PurchaseController);
    });
  });
});
