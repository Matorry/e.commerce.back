import { NextFunction, Request, Response } from 'express';
import { Repository } from '../repository/repository.js';
import { UserMongoRepository } from '../repository/user.mongo.repository.js';
import { Auth } from '../services/auth.js';
import { HttpError } from '../types/http.error.js';
export type WithId = {
  id: string;
};
export class AuthInterceptor {
  authorization(req: Request, _res: Response, next: NextFunction) {
    try {
      const token = req.get('Authorization')?.split(' ')[1];
      if (!token) {
        throw new HttpError(498, 'Invalid token', 'No token provided');
      }

      const { id } = Auth.verifyTokenGettingPayload(token);
      req.body.validatedId = id;
      next();
    } catch (error) {
      next(error);
    }
  }

  authentication<T extends { id: unknown }>(
    itemsRepo: Repository<T>,
    ownerKey: keyof T
  ) {
    return async (req: Request, _res: Response, next: NextFunction) => {
      const userID = req.body.validatedId;
      const itemID = req.params.id;
      try {
        const item = await itemsRepo.get(itemID);
        const itemOwner = (item[ownerKey] as WithId).id;
        if (itemOwner !== userID) {
          throw new HttpError(403, 'Forbidden', 'Not item owner');
        }

        next();
      } catch (error) {
        next(error);
      }
    };
  }

  async adminAuthentication(req: Request, _res: Response, next: NextFunction) {
    const userId = req.body.validatedId;
    try {
      const repo = new UserMongoRepository();
      const user = await repo.get(userId);

      if (user.role !== 'admin') {
        const error = new HttpError(403, 'Forbidden', 'Not authorizate');
        next(error);
      }

      next();
    } catch (error) {
      next(error);
    }
  }
}
