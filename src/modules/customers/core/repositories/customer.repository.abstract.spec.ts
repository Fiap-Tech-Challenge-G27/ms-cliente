/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICustomerRepository } from './customer.repository.abstract';
import { Customer, CustomerEntity } from '../entities/customer.entity';

describe('ICustomerRepository', () => {
  class TestCustomerRepository extends ICustomerRepository {
    async create(data: Customer): Promise<Customer> {
      return data;
    }

    async update(id: string, data: Customer): Promise<Customer> {
      return data;
    }

    async findOne(filter: string, options?: any): Promise<Customer | null> {
      return null;
    }

    async findAll(): Promise<Customer[]> {
      return [];
    }

    async remove(id: string): Promise<void> {
      return;
    }

    async findExistingCustomer(
      cpf: string,
      email: string,
    ): Promise<CustomerEntity> {
      return {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '12345678900',
        address: "Rua ABC",
        phone: "11987654321"
      };
    }
  }

  let repository: TestCustomerRepository;

  beforeEach(() => {
    repository = new TestCustomerRepository();
  });

  it('should find existing customer by cpf and email', async () => {
    const cpf = '12345678900';
    const email = 'john@example.com';

    const existingCustomer = await repository.findExistingCustomer(cpf, email);

    expect(existingCustomer).toEqual({
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '12345678900',
      address: "Rua ABC",
      phone: "11987654321"
    });
  });
});
