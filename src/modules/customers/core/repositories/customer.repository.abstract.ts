import { Customer } from '../entities/customer.entity';
import { Repository } from 'src/shared/core/repository';

export abstract class ICustomerRepository extends Repository<Customer> {}
