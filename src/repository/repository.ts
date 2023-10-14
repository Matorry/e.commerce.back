/* eslint-disable no-unused-vars */
export interface Repository<X extends { id: unknown }> {
  getAll(): Promise<X[]>;
  get(id: X['id']): Promise<X>;
  post(newData: Omit<X, 'id'>): Promise<X>;
  patch(id: X['id'], newData: Partial<X>): Promise<X>;
  delete(id: X['id']): Promise<void>;
  search({ key, value }: { key: string; value: unknown }): Promise<X[]>;
}
