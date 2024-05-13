import { RemoveCustomerInteractor } from './remove-customer.interactor';
import { ICustomerRepository } from '../../core/repositories/customer.repository.abstract';
import { IExceptionService } from '../../../../shared/exceptions/exceptions.interface';

describe('RemoveCustomerInteractor', () => {
  let interactor: RemoveCustomerInteractor;
  let customerRepository: ICustomerRepository;
  let exceptionService: IExceptionService;

  beforeEach(() => {
    customerRepository = {
      remove: jest.fn(),
    } as any;

    exceptionService = {
      internalServerErrorException: jest.fn(),
    } as any;

    interactor = new RemoveCustomerInteractor(
      customerRepository,
      exceptionService,
    );
  });

  it('should be defined', () => {
    expect(interactor).toBeDefined();
  });

  describe('execute', () => {
    it('should remove customer', async () => {
      const cpf = '12345678900';

      await interactor.execute(cpf);

      expect(customerRepository.remove).toHaveBeenCalledWith(cpf);
    });

    it('should throw internal server error exception on repository error', async () => {
      const cpf = '12345678900';

      (customerRepository.remove as jest.Mock).mockRejectedValueOnce(
        new Error('Repository error'),
      );

      await expect(interactor.execute(cpf)).resolves.toBeUndefined();

      expect(
        exceptionService.internalServerErrorException,
      ).toHaveBeenCalledWith({
        message: 'Error to remove a customer',
        code: 500,
      });
    });
  });
});
