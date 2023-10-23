import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { ProductController } from './controller/product.controller.js';
import { PurchaseController } from './controller/purchase.controller.js';
import { UsersController } from './controller/user.controller.js';
import { Product } from './entities/product.js';
import { Purchase } from './entities/purchase.js';
import { User } from './entities/user.js';
import { ErrorMiddleware } from './middleware/error.middleware.js';
import { FilesInterceptor } from './middleware/files.interceptor.js';
import { ProductMongoRepository } from './repository/product.mongo.repository.js';
import { PurchaseMongoRepository } from './repository/purchase.mongo.repository.js';
import { Repository } from './repository/repository.js';
import { UserMongoRepository } from './repository/user.mongo.repository.js';
import { ProductRouter } from './routers/product.router.js';
import { PurchaseRouter } from './routers/purchase.router.js';
import { UsersRouter } from './routers/user.router.js';
import { HttpError } from './types/http.error.js';
export const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
const filesInterceptor = new FilesInterceptor();
const userRepo: Repository<User> = new UserMongoRepository();
const userController: UsersController = new UsersController(userRepo);
const userRouter = new UsersRouter(userController);

const productRepo: Repository<Product> = new ProductMongoRepository();
const productController: ProductController = new ProductController(productRepo);
const productRouter = new ProductRouter(productController, filesInterceptor);

const purchaseRepo: Repository<Purchase> = new PurchaseMongoRepository();
const purchaseController: PurchaseController = new PurchaseController(
  purchaseRepo
);
const purchaseRouter = new PurchaseRouter(purchaseController);

app.use('/users', userRouter.router);
app.use('/product', productRouter.routerProduct);
app.use('/purchase', purchaseRouter.routerPurchase);

app.use('/:id', (req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError(400, 'Bad request', 'Invalid route');
  next(error);
});

const errorMiddleware = new ErrorMiddleware();
app.use(errorMiddleware.manageErrors.bind(errorMiddleware));
