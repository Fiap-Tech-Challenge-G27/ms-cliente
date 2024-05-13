import { FindCustomerInteractor } from './find-customer.interactor';
import { ICustomerRepository } from '../../core/repositories/customer.repository.abstract';
import { Customer } from '../../core/entities/customer.entity';
import { IExceptionService } from '../../../../shared/exceptions/exceptions.interface';

describe('FindCustomerInteractor', () => {
  let interactor: FindCustomerInteractor;
  let customerRepository: ICustomerRepository;
  let exceptionService: IExceptionService;

  beforeEach(() => {
    customerRepository = {
      findOne: jest.fn(),
    } as any;

    exceptionService = {
      notFoundException: jest.fn(),
      internalServerErrorException: jest.fn(),
    } as any;

    interactor = new FindCustomerInteractor(
      customerRepository,
      exceptionService,
    );
  });

  it('should be defined', () => {
    expect(interactor).toBeDefined();
  });

  describe('execute', () => {
    it('should find customer and return', async () => {
      const cpf = '12345678900';
      const customer: Customer = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        cpf,
      };

      (customerRepository.findOne as jest.Mock).mockResolvedValueOnce(customer);

      const foundCustomer = await interactor.execute(cpf);

      expect(foundCustomer).toEqual(customer);
    });

    it('should throw not found exception if customer not found', async () => {
      const cpf = '12345678900';

      (customerRepository.findOne as jest.Mock).mockResolvedValueOnce(null);

      await interactor.execute(cpf);

      expect(exceptionService.notFoundException).toHaveBeenCalledWith({
        message: 'Customer not found',
        code: 404,
      });
    });

    it('should throw internal server error exception on repository error', async () => {
      const cpf = '12345678900';

      (customerRepository.findOne as jest.Mock).mockRejectedValueOnce(
        new Error('Repository error'),
      );

      await expect(interactor.execute(cpf)).resolves.toBeUndefined();

      expect(
        exceptionService.internalServerErrorException,
      ).toHaveBeenCalledWith({
        message: 'Error to find a customer',
        code: 500,
      });
    });
  });
});
