/* eslint-disable no-unused-vars */
import express, { Router as createRouter } from 'express';
import { ProductController } from '../controller/product.controller.js';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { FilesInterceptor } from '../middleware/files.interceptor.js';
import { ProductMongoRepository } from '../repository/product.mongo.repository.js';

export class ProductRouter {
  routerProduct: express.Router;
  repoProduct: ProductMongoRepository;
  authInterceptor: AuthInterceptor;

  constructor(
    private controller: ProductController,
    private filesInterceptor: FilesInterceptor
  ) {
    this.repoProduct = new ProductMongoRepository();
    this.routerProduct = createRouter();
    this.authInterceptor = new AuthInterceptor();
    this.configure();
  }

  configure() {
    this.routerProduct.get(
      '/:id',
      this.controller.getAll.bind(this.controller)
    );
    this.routerProduct.get('/', this.controller.get.bind(this.controller));
    this.routerProduct.post(
      '/',
      this.authInterceptor.authorization.bind(this.authInterceptor),
      this.filesInterceptor.singleFileStore('imageData'),
      this.authInterceptor.adminAuthentication.bind(this.authInterceptor),
      this.controller.create.bind(this.controller)
    );
    this.routerProduct.patch(
      '/img/:id',
      this.authInterceptor.authorization.bind(this.authInterceptor),
      this.filesInterceptor.singleFileStore('imageData'),
      this.authInterceptor.adminAuthentication.bind(this.authInterceptor),
      this.controller.updateProductWhithImg.bind(this.controller)
    );
    this.routerProduct.patch(
      '/noimg/:id',
      this.authInterceptor.authorization.bind(this.authInterceptor),
      this.authInterceptor.adminAuthentication.bind(this.authInterceptor),
      this.controller.patch.bind(this.controller)
    );
    this.routerProduct.delete(
      '/:id',
      this.authInterceptor.authorization.bind(this.authInterceptor),
      this.authInterceptor.adminAuthentication.bind(this.authInterceptor),
      this.controller.delete.bind(this.controller)
    );
  }
}
