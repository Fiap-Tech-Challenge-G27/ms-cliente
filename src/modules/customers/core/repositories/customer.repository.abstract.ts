import { Customer, CustomerEntity } from '../entities/customer.entity';
import { Repository } from '../../../../shared/core/repository';

export abstract class ICustomerRepository extends Repository<Customer> {
  abstract findExistingCustomer(
    cpf: string,
    email: string,
  ): Promise<CustomerEntity>;
}
