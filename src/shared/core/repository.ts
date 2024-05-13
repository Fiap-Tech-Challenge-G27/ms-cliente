import { Entity } from './entity';

export abstract class Repository<TEntity extends Entity> {
  abstract create(data: TEntity): Promise<TEntity>;
  abstract update?(id: string, data: TEntity): Promise<TEntity>;
  abstract findOne(filter: string, options?: any): Promise<TEntity | null>;
  abstract findAll(): Promise<TEntity[]>;
  abstract remove?(id: string): Promise<void>;
}
