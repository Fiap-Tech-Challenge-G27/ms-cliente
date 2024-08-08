import { CustomerEntity } from '../entities/customer.entity';

import { Mapper } from '../../../../shared/core/mapper';
import { UpdateCustomerDto } from '../../app/update-customer/update-customer.dto';
import { CreateCustomerDto } from '../../app/create-customer/create-customer.dto';

export class CustomerMapper extends Mapper<
  CreateCustomerDto | UpdateCustomerDto,
  CustomerEntity
> {
  mapFrom(param: CreateCustomerDto | UpdateCustomerDto): CustomerEntity {
    const customer = new CustomerEntity(param.name, param.email, param.cpf, param.address, param.phone);
    return customer;
  }
}
