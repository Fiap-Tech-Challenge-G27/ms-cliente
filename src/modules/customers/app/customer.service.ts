import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './create-customer/create-customer.dto';
import { CreateCustomerInteractor } from './create-customer/create-customer.interactor';
import { Customer } from '../core/entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    private readonly createCustomerInteractor: CreateCustomerInteractor,
  ) {}

  async createCustomer(dto: CreateCustomerDto): Promise<Customer> {
    return this.createCustomerInteractor.execute(dto);
  }
}
