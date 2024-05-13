import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Customer,
  CustomerSchema,
} from './infra/mongodb/model/customers.model';
import { CustomersController } from './controller/customers.controller';
import { CustomerService } from './app/customer.service';
import { IExceptionService } from '../../shared/exceptions/exceptions.interface';
import { ExceptionsService } from '../../shared/infra/exceptions/exceptions.service';
import { CustomerRepositoryMongoDB } from './infra/mongodb/repositories/customers.repository.mongodb';
import { ICustomerRepository } from './core/repositories/customer.repository.abstract';
import { CreateCustomerInteractor } from './app/create-customer/create-customer.interactor';
import { CustomerMapper } from './core/mappers/customer.mapper';
import { UpdateCustomerInteractor } from './app/update-customer/update-customer.interactor.ts';
import { RemoveCustomerInteractor } from './app/remove-customer/remove-customer.interactor';
import { FindCustomerInteractor } from './app/find-customer/find-customer.interactor';
import { FindAllCustomersInteractor } from './app/find-all-customers/find-all-customers.interactor';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [CustomersController],
  providers: [
    {
      provide: ICustomerRepository,
      useClass: CustomerRepositoryMongoDB,
    },
    {
      provide: IExceptionService,
      useClass: ExceptionsService,
    },
    CustomerService,
    CustomerRepositoryMongoDB,
    CreateCustomerInteractor,
    UpdateCustomerInteractor,
    RemoveCustomerInteractor,
    FindCustomerInteractor,
    FindAllCustomersInteractor,
    CustomerMapper,
  ],
})
export class CustomersModule {}
