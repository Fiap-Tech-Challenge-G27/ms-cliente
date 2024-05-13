import { FindAllCustomersInteractor } from './find-all-customers.interactor';
import { ICustomerRepository } from '../../core/repositories/customer.repository.abstract';
import { Customer } from '../../core/entities/customer.entity';
import { IExceptionService } from '../../../../shared/exceptions/exceptions.interface';

describe('FindAllCustomersInteractor', () => {
  let interactor: FindAllCustomersInteractor;
  let customerRepository: ICustomerRepository;
  let exceptionService: IExceptionService;

  beforeEach(() => {
    customerRepository = {
      findAll: jest.fn(),
    } as any;

    exceptionService = {
      notFoundException: jest.fn(),
      internalServerErrorException: jest.fn(),
    } as any;

    interactor = new FindAllCustomersInteractor(
      customerRepository,
      exceptionService,
    );
  });

  it('should be defined', () => {
    expect(interactor).toBeDefined();
  });

  describe('execute', () => {
    it('should find all customers and return', async () => {
      const customers: Customer[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          cpf: '12345678900',
        },
        {
          id: '2',
          name: 'Jane Doe',
          email: 'jane@example.com',
          cpf: '98765432100',
        },
      ];

      (customerRepository.findAll as jest.Mock).mockResolvedValueOnce(
        customers,
      );

      const foundCustomers = await interactor.execute();

      expect(foundCustomers).toEqual(customers);
    });

    it('should throw not found exception if no customers found', async () => {
      (customerRepository.findAll as jest.Mock).mockResolvedValueOnce(null);

      await interactor.execute();

      expect(exceptionService.notFoundException).toHaveBeenCalledWith({
        message: 'Customers not found',
        code: 404,
      });
    });

    it('should throw internal server error exception on repository error', async () => {
      (customerRepository.findAll as jest.Mock).mockRejectedValueOnce(
        new Error('Repository error'),
      );

      await expect(interactor.execute()).resolves.toBeUndefined();

      expect(
        exceptionService.internalServerErrorException,
      ).toHaveBeenCalledWith({
        message: 'Error to find all customers',
        code: 500,
      });
    });
  });
});
