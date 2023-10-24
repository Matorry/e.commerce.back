import { ProductController } from '../controller/product.controller';
import { FilesInterceptor } from '../middleware/files.interceptor';
import { ProductRouter } from './product.router';

describe('Given UsersRouter', () => {
  describe('When we instantiate it', () => {
    jest.spyOn(Function.prototype, 'bind');
    const controllerCommand = {
      getAll: jest.fn(),
      get: jest.fn(),
      create: jest.fn(),
      patch: jest.fn(),
      delete: jest.fn(),
      getUserCommands: jest.fn(),
    } as unknown as ProductController;
    controllerCommand.updateProductWhithImg = jest.fn();
    const filesCommand: FilesInterceptor = new FilesInterceptor();
    filesCommand.singleFileStore = jest.fn().mockReturnValue(() => {});
    const routerCommand = new ProductRouter(controllerCommand, filesCommand);
    test('Then it should ...', () => {
      expect(routerCommand).toBeInstanceOf(ProductRouter);
      expect(Function.prototype.bind).toHaveBeenCalledTimes(14);
    });
  });
});
