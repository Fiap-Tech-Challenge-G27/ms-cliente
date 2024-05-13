import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/customerdb'),
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
