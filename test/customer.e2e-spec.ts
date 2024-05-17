import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, MongooseModule.forRoot(uri)],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    const connection = await app.get(getConnectionToken());
    const collections = await connection.db.collections();
    for (const collection of collections) {
      await collection.deleteMany({});
    }
  });

  afterAll(async () => {
    await app.close();
    await mongod.stop();
  });

  it('/customers (POST) - Create Customer BDD', async () => {
    // Arrange
    const customerData = {
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '12345678900',
    };

    // Act
    const response = await request(app.getHttpServer())
      .post('/customers')
      .send(customerData);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body.name).toBe('John Doe');
    expect(response.body.email).toBe('john@example.com');
    expect(response.body.cpf).toBe('12345678900');
  });
});
