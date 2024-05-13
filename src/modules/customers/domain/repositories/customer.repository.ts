import { Entity } from 'src/shared/core/entity';
import { Customer } from '../entities/customer.entity';

export interface CustomerRepository extends Entity {
  create(customer: Customer): Promise<Customer>;
  update(id: string, customer: Customer): Promise<Customer>;
  findOne(id: string): Promise<Customer | null>;
  findAll(): Promise<Customer[]>;
  remove(id: string): Promise<void>;
}
