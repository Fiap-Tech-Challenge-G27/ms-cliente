import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './create-customer/create-customer.dto';
import { UpdateCustomerDto } from './update-customer/update-customer.dto';

describe('CustomerService', () => {
  let service: CustomerService;
  let createInteractor: any;
  let updateInteractor: any;
  let findInteractor: any;
  let removeInteractor: any;
  let findAllInteractor: any;

  beforeEach(() => {
    createInteractor = {
      execute: jest.fn(),
    };
    updateInteractor = {
      execute: jest.fn(),
    };
    findInteractor = {
      execute: jest.fn(),
    };
    removeInteractor = {
      execute: jest.fn(),
    };
    findAllInteractor = {
      execute: jest.fn(),
    };

    service = new CustomerService(
      createInteractor,
      updateInteractor,
      findInteractor,
      removeInteractor,
      findAllInteractor,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCustomer', () => {
    it('should call create interactor with correct argument', async () => {
      const createDto: CreateCustomerDto = {
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '12345678900',
      };
      await service.createCustomer(createDto);
      expect(createInteractor.execute).toHaveBeenCalledWith(createDto);
    });
  });

  describe('updateCustomer', () => {
    it('should call update interactor with correct arguments', async () => {
      const cpf = '12345678900';
      const updateDto: UpdateCustomerDto = {
        name: 'Updated Name',
        email: 'updated@example.com',
      };
      await service.updateCustomer(cpf, updateDto);
      expect(updateInteractor.execute).toHaveBeenCalledWith(cpf, updateDto);
    });
  });

  describe('findCustomer', () => {
    it('should call find interactor with correct argument', async () => {
      const cpf = '12345678900';
      await service.findCustomer(cpf);
      expect(findInteractor.execute).toHaveBeenCalledWith(cpf);
    });
  });

  describe('removeCustomer', () => {
    it('should call remove interactor with correct argument', async () => {
      const cpf = '12345678900';
      await service.removeCustomer(cpf);
      expect(removeInteractor.execute).toHaveBeenCalledWith(cpf);
    });
  });

  describe('findAllCustomers', () => {
    it('should call find all interactor', async () => {
      await service.findAllCustomers();
      expect(findAllInteractor.execute).toHaveBeenCalled();
    });
  });
});
