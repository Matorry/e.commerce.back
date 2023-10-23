/* eslint-disable no-unused-vars */
import express, { Router as createRouter } from 'express';
import { PurchaseController } from '../controller/purchase.controller.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { PurchaseMongoRepository } from '../repository/purchase.mongo.repository.js';

export class PurchaseRouter {
  routerPurchase: express.Router;
  repoPurchase: PurchaseMongoRepository;
  authInterceptor: AuthInterceptor;

  constructor(private controller: PurchaseController) {
    this.repoPurchase = new PurchaseMongoRepository();
    this.routerPurchase = createRouter();
    this.authInterceptor = new AuthInterceptor();
    this.configure();
  }

  configure() {
    this.routerPurchase.get(
      '/:id',
      this.authInterceptor.authorization.bind(this.authInterceptor),
      this.controller.getAll.bind(this.controller)
    );
    this.routerPurchase.get(
      '/',
      this.authInterceptor.authorization.bind(this.authInterceptor),
      this.controller.get.bind(this.controller)
    );
    this.routerPurchase.post(
      '/',
      this.authInterceptor.authorization.bind(this.authInterceptor),
      this.controller.post.bind(this.controller)
    );
  }
}
