import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICustomerRepository } from '../../../core/repositories/customer.repository.abstract';
import { Customer } from '../model/customers.model';
import { CustomerEntity } from '../../../core/entities/customer.entity';

@Injectable()
export class CustomerRepositoryMongoDB implements ICustomerRepository {
  constructor(
    @InjectModel(Customer.name) private readonly customerModel: Model<Customer>,
  ) {}

  async create(customer: CustomerEntity): Promise<CustomerEntity> {
    const createdCustomer = await this.customerModel.create(customer);
    return this.transformCustomer(createdCustomer);
  }

  async update(
    cpf: string,
    customer: Partial<CustomerEntity>,
  ): Promise<CustomerEntity> {
    const updatedCustomer = await this.customerModel.findOneAndUpdate(
      { cpf },
      customer,
      { new: true },
    );
    return this.transformCustomer(updatedCustomer);
  }

  async findOne(cpf: string): Promise<CustomerEntity | null> {
    const customer = await this.customerModel.findOne({ cpf });
    return customer ? this.transformCustomer(customer) : null;
  }

  async findExistingCustomer(
    cpf: string,
    email: string,
  ): Promise<CustomerEntity | null> {
    const existingCustomer = await this.customerModel.findOne({
      $or: [{ cpf }, { email }],
    });

    return existingCustomer ? this.transformCustomer(existingCustomer) : null;
  }

  async findAll(): Promise<CustomerEntity[]> {
    const customers = await this.customerModel.find();
    return customers.map((customer) => this.transformCustomer(customer));
  }

  async remove(cpf: string): Promise<void> {
    await this.customerModel.findOneAndDelete({ cpf });
  }

  private transformCustomer(customer: Customer): CustomerEntity {
    return {
      id: (customer?._id as string) || (customer?.id as string) || '',
      name: customer.name,
      email: customer.email,
      cpf: customer.cpf,
      phone: customer.phone,
      address: customer.address,
      createdAt: customer.createdAt,
      updatedAt: customer.updatedAt,
    };
  }
}
