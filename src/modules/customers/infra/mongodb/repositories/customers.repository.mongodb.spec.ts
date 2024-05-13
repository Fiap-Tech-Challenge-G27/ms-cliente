import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CustomerRepositoryMongoDB } from './customers.repository.mongodb';
import { Customer } from '../model/customers.model';
import { CustomerEntity } from '../../../core/entities/customer.entity';

describe('CustomerRepositoryMongoDB', () => {
  let repository: CustomerRepositoryMongoDB;
  let modelMock: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerRepositoryMongoDB,
        {
          provide: getModelToken(Customer.name),
          useValue: {
            create: jest.fn(),
            findOneAndUpdate: jest.fn(),
            findOne: jest.fn(),
            find: jest.fn(),
            findOneAndDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<CustomerRepositoryMongoDB>(
      CustomerRepositoryMongoDB,
    );
    modelMock = module.get(getModelToken(Customer.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a customer and return the transformed entity', async () => {
      const mockCustomer = {
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '12345678900',
        createdAt: new Date(2022, 0, 1),
        updatedAt: new Date(2022, 0, 1),
      };

      const expectedTransformedCustomer: CustomerEntity = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '12345678900',
        createdAt: new Date(2022, 0, 1),
        updatedAt: new Date(2022, 0, 1),
      };

      modelMock.create.mockResolvedValue(mockCustomer);

      const createdCustomer = await repository.create(mockCustomer);
      expect(createdCustomer).toEqual(expectedTransformedCustomer);
    });
  });

  describe('update', () => {
    it('should update a customer and return the transformed entity', async () => {
      const mockCpf = '1';
      const mockCustomerDataToUpdate = {
        name: 'Updated Name',
      };

      const expectedTransformedCustomer: CustomerEntity = {
        id: '1',
        name: 'Updated Name',
        email: 'john@example.com',
        cpf: '12345678900',
        createdAt: new Date(2022, 0, 1),
        updatedAt: new Date(2022, 0, 1),
      };

      const mockCustomer = {
        _id: '1',
        name: 'Updated Name',
        email: 'john@example.com',
        cpf: '12345678900',
        createdAt: new Date(2022, 0, 1),
        updatedAt: new Date(2022, 0, 1),
      };

      modelMock.findOneAndUpdate.mockResolvedValue(mockCustomer);

      const updatedCustomer = await repository.update(
        mockCpf,
        mockCustomerDataToUpdate,
      );
      expect(updatedCustomer).toEqual(expectedTransformedCustomer);
    });
  });

  describe('findOne', () => {
    it('should find a customer by CPF and return the transformed entity', async () => {
      const mockCpf = '12345678900';

      const expectedTransformedCustomer: CustomerEntity = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '12345678900',
        createdAt: new Date(2022, 0, 1),
        updatedAt: new Date(2022, 0, 1),
      };

      const mockCustomer = {
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '12345678900',
        createdAt: new Date(2022, 0, 1),
        updatedAt: new Date(2022, 0, 1),
      };

      modelMock.findOne.mockResolvedValue(mockCustomer);

      const foundCustomer = await repository.findOne(mockCpf);
      expect(foundCustomer).toEqual(expectedTransformedCustomer);
    });
  });

  describe('findExistingCustomer', () => {
    it('should find a customer by CPF or e-mail and return the transformed entity', async () => {
      const mockCreateCustomer = {
        email: 'john@example.com',
        cpf: '12345678900',
      };

      const expectedTransformedCustomer: CustomerEntity = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '12345678900',
        createdAt: new Date(2022, 0, 1),
        updatedAt: new Date(2022, 0, 1),
      };

      const mockCustomer = {
        _id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '12345678900',
        createdAt: new Date(2022, 0, 1),
        updatedAt: new Date(2022, 0, 1),
      };

      modelMock.findOne.mockResolvedValue(mockCustomer);

      const foundCustomer = await repository.findExistingCustomer(
        mockCreateCustomer.cpf,
        mockCreateCustomer.email,
      );
      expect(foundCustomer).toEqual(expectedTransformedCustomer);
    });
  });

  describe('findAll', () => {
    it('should find all customers and return the transformed entities', async () => {
      const mockCustomers = [
        {
          _id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          cpf: '12345678900',
          createdAt: new Date(2022, 0, 1),
          updatedAt: new Date(2022, 0, 1),
        },
        {
          _id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          cpf: '98765432100',
          createdAt: new Date(2022, 0, 1),
          updatedAt: new Date(2022, 0, 1),
        },
      ];

      const expectedTransformedCustomers: CustomerEntity[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          cpf: '12345678900',
          createdAt: new Date(2022, 0, 1),
          updatedAt: new Date(2022, 0, 1),
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          cpf: '98765432100',
          createdAt: new Date(2022, 0, 1),
          updatedAt: new Date(2022, 0, 1),
        },
      ];

      modelMock.find.mockResolvedValue(mockCustomers);

      const foundCustomers = await repository.findAll();
      expect(foundCustomers).toEqual(expectedTransformedCustomers);
    });
  });

  describe('remove', () => {
    it('should remove a customer by CPF', async () => {
      const mockCpf = '12345678900';

      await repository.remove(mockCpf);
      expect(modelMock.findOneAndDelete).toHaveBeenCalledWith({
        cpf: mockCpf,
      });
    });
  });
});
