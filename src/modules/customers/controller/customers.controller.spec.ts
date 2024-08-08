import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { CustomerService } from '../app/customer.service';
import { CreateCustomerDto } from '../app/create-customer/create-customer.dto';
import { UpdateCustomerDto } from '../app/update-customer/update-customer.dto';

describe('CustomersController', () => {
  let controller: CustomersController;
  let customerService: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [
        {
          provide: CustomerService,
          useValue: {
            createCustomer: jest.fn(),
            findAllCustomers: jest.fn(),
            findCustomer: jest.fn(),
            updateCustomer: jest.fn(),
            removeCustomer: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    customerService = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call createCustomer service method with correct argument', () => {
      const createDto: CreateCustomerDto = {
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '12345678900',
        address: "Rua ABC",
        phone: "11987654321"
      };
      controller.create(createDto);
      expect(customerService.createCustomer).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should call findAllCustomers service method', () => {
      controller.findAll();
      expect(customerService.findAllCustomers).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call findCustomer service method with correct argument', () => {
      const cpf = '12345678900';
      controller.findOne(cpf);
      expect(customerService.findCustomer).toHaveBeenCalledWith(cpf);
    });
  });

  describe('update', () => {
    it('should call updateCustomer service method with correct arguments', () => {
      const cpf = '12345678900';
      const updateDto: UpdateCustomerDto = {
        name: 'Updated Name',
        email: 'updated@example.com',
      };
      controller.update(cpf, updateDto);
      expect(customerService.updateCustomer).toHaveBeenCalledWith(
        cpf,
        updateDto,
      );
    });
  });

  describe('remove', () => {
    it('should call removeCustomer service method with correct argument', () => {
      const cpf = '12345678900';
      controller.remove(cpf);
      expect(customerService.removeCustomer).toHaveBeenCalledWith(cpf);
    });
  });
});
