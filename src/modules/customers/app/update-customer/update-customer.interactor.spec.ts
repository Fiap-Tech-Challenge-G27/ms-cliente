import { UpdateCustomerInteractor } from './update-customer.interactor.ts';
import { ICustomerRepository } from '../../core/repositories/customer.repository.abstract';
import { CustomerMapper } from '../../core/mappers/customer.mapper';
import { IExceptionService } from '../../../../shared/exceptions/exceptions.interface';
import { UpdateCustomerDto } from './update-customer.dto';

describe('UpdateCustomerInteractor', () => {
  let interactor: UpdateCustomerInteractor;
  let customerRepository: ICustomerRepository;
  let customerMapper: CustomerMapper;
  let exceptionService: IExceptionService;

  beforeEach(() => {
    customerRepository = {
      findOne: jest.fn(),
      update: jest.fn(),
    } as any;

    customerMapper = {
      mapFrom: jest.fn(),
    } as any;

    exceptionService = {
      notFoundException: jest.fn(),
      internalServerErrorException: jest.fn(),
    } as any;

    interactor = new UpdateCustomerInteractor(
      customerRepository,
      customerMapper,
      exceptionService,
    );
  });

  it('should be defined', () => {
    expect(interactor).toBeDefined();
  });

  describe('execute', () => {
    it('should update customer and return', async () => {
      const cpf = '12345678900';
      const updateDto: UpdateCustomerDto = {
        name: 'Updated Name',
        email: 'updated@example.com',
      };

      const existingCustomer = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '12345678900',
      };

      (customerRepository.findOne as jest.Mock).mockResolvedValueOnce(
        existingCustomer,
      );
      (customerRepository.update as jest.Mock).mockResolvedValueOnce(
        existingCustomer,
      );

      await interactor.execute(cpf, updateDto);

      expect(customerRepository.findOne).toHaveBeenCalledWith(cpf);
      expect(customerRepository.update).toHaveBeenCalledWith(cpf, updateDto);
    });

    it('should throw not found exception if customer not found', async () => {
      const cpf = '12345678900';
      const updateDto: UpdateCustomerDto = {
        name: 'Updated Name',
        email: 'updated@example.com',
      };

      (customerRepository.findOne as jest.Mock).mockResolvedValueOnce(null);

      await expect(interactor.execute(cpf, updateDto)).resolves.toBeUndefined();

      expect(exceptionService.notFoundException).toHaveBeenCalledWith({
        message: 'Customer not found',
        code: 404,
      });
    });

    it('should throw internal server error exception on repository error', async () => {
      const cpf = '12345678900';
      const updateDto: UpdateCustomerDto = {
        name: 'Updated Name',
        email: 'updated@example.com',
      };

      (customerRepository.findOne as jest.Mock).mockRejectedValueOnce(
        new Error('Repository error'),
      );

      await expect(interactor.execute(cpf, updateDto)).resolves.toBeUndefined();

      expect(
        exceptionService.internalServerErrorException,
      ).toHaveBeenCalledWith({
        message: 'Error to update a customer',
        code: 500,
      });
    });
  });
});
