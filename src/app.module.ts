import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from './modules/health/health.module';
import { CustomersModule } from './modules/customers/customers.module';

@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.MONGO_URL}/customers'`),
    HealthModule,
    CustomersModule,
  ],
})
export class AppModule {}
