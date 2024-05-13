import { Customer } from '../entities/customer.entity';

export interface CustomerRepository {
  create(customer: Customer): Promise<Customer>;
  update(id: string, customer: Customer): Promise<Customer>;
  findOne(id: string): Promise<Customer | null>;
  findAll(): Promise<Customer[]>;
  remove(id: string): Promise<void>;
}
