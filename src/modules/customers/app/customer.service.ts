import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './create-customer/create-customer.dto';
import { CreateCustomerInteractor } from './create-customer/create-customer.interactor';
import { Customer } from '../core/entities/customer.entity';
import { UpdateCustomerDto } from './update-customer/update-customer.dto';
import { UpdateCustomerInteractor } from './update-customer/update-customer.interactor.ts';
import { FindCustomerInteractor } from './find-customer/find-customer.interactor';
import { RemoveCustomerInteractor } from './remove-customer/remove-customer.interactor';
import { FindAllCustomersInteractor } from './find-all-customers/find-all-customers.interactor';

@Injectable()
export class CustomerService {
  constructor(
    private readonly create: CreateCustomerInteractor,
    private readonly update: UpdateCustomerInteractor,
    private readonly findOne: FindCustomerInteractor,
    private readonly remove: RemoveCustomerInteractor,
    private readonly findAll: FindAllCustomersInteractor,
  ) {}

  async createCustomer(dto: CreateCustomerDto): Promise<Customer> {
    return this.create.execute(dto);
  }

  async updateCustomer(cpf: string, dto: UpdateCustomerDto): Promise<Customer> {
    return this.update.execute(cpf, dto);
  }

  async findCustomer(cpf: string): Promise<Customer> {
    return this.findOne.execute(cpf);
  }

  async removeCustomer(cpf: string): Promise<void> {
    return this.remove.execute(cpf);
  }

  async findAllCustomers(): Promise<Customer[]> {
    return this.findAll.execute();
  }
}
