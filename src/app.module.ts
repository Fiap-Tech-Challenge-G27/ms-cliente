import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from './modules/health/health.module';
import { CustomersModule } from './modules/customers/customers.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/customerdb'),
    HealthModule,
    CustomersModule,
  ],
})
export class AppModule {}
