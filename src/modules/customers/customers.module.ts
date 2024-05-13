import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import Customer from './infra/model/customers.model';
//import { CustomerController } from './customer.controller';
//import { CustomerService } from './customer.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Customer.name, schema: Customer }]),
  ],
  controllers: [],
  providers: [],
})
export class CustomersModule {}
