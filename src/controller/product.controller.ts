import { NextFunction, Request, Response } from 'express';
import { Product } from '../entities/product.js';
import { ProductMongoRepository } from '../repository/product.mongo.repository.js';
import { CloudinaryService } from '../services/mediaFiles.js';
import { HttpError } from '../types/http.error.js';
import { Controller } from './controller.js';
export class ProductController extends Controller<Product> {
  cloudinary: CloudinaryService;
  constructor(protected repo: ProductMongoRepository) {
    super(repo);
    this.cloudinary = new CloudinaryService();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new HttpError(
          400,
          'Bad Request',
          'No avatar image for the command'
        );
      }

      const finalPath = req.file.destination + '/' + req.file.filename;
      const imageData = await this.cloudinary.uploadImage(finalPath);
      req.body.imageData = imageData;
      const product = await this.repo.post(req.body);

      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async updateProductWhithImg(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new HttpError(
          400,
          'Bad Request',
          'No avatar image for the command'
        );
      }

      const finalPath = req.file.destination + '/' + req.file.filename;
      const imageData = await this.cloudinary.uploadImage(finalPath);
      req.body.imageData = imageData;
      await this.repo.patch(req.body.id, req.body);
      res.json(req.body);
    } catch (error) {
      next(error);
    }
  }
}
