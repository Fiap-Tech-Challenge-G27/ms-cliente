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
    CustomerMapper,
  ],
})
export class CustomersModule {}
