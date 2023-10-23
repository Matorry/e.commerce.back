import { Purchase } from '../entities/purchase.js';
import { PurchaseMongoRepository } from '../repository/purchase.mongo.repository.js';
import { Controller } from './controller.js';
export class PurchaseController extends Controller<Purchase> {
  constructor(protected repo: PurchaseMongoRepository) {
    super(repo);
  }
}
