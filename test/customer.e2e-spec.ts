import { getConnectionToken } from '@nestjs/mongoose';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
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
  });

  it('/health (GET)', () => {
    return request(app.getHttpServer()).get('/health').expect(200).expect('OK');
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

  it('/customers (POST) - Missing required fields', async () => {
    // Arrange
    const customerData = {
      email: 'john@example.com',
    };

    // Act
    const response = await request(app.getHttpServer())
      .post('/customers')
      .send(customerData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Name should not be empty');
    expect(response.body.message).toContain('CPF should not be empty');
  });

  it('/customers (POST) - Duplicate CPF', async () => {
    // Arrange
    const customerData = {
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '12345678900',
    };

    // Act
    await request(app.getHttpServer()).post('/customers').send(customerData);
    const response = await request(app.getHttpServer())
      .post('/customers')
      .send(customerData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body.message).toContain(
      'Customer already exists with this cpf or email',
    );
  });
});
