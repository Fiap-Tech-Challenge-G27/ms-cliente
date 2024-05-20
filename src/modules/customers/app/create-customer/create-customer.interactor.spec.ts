import { CreateCustomerInteractor } from './create-customer.interactor';
import { ICustomerRepository } from '../../core/repositories/customer.repository.abstract';
import { CreateCustomerDto } from './create-customer.dto';
import { Customer } from '../../core/entities/customer.entity';
import { CustomerMapper } from '../../core/mappers/customer.mapper';
import { IExceptionService } from '../../../../shared/exceptions/exceptions.interface';

describe('CreateCustomerInteractor', () => {
  let interactor: CreateCustomerInteractor;
  let customerRepository: ICustomerRepository;
  let customerMapper: CustomerMapper;
  let exceptionService: IExceptionService;

  beforeEach(() => {
    customerRepository = {
      findExistingCustomer: jest.fn(),
      create: jest.fn(),
    } as any;

    customerMapper = {
      mapFrom: jest.fn(),
    } as any;

    exceptionService = {
      badRequestException: jest.fn(),
      internalServerErrorException: jest.fn(),
    } as any;

    interactor = new CreateCustomerInteractor(
      customerRepository,
      customerMapper,
      exceptionService,
    );
  });

  it('should be defined', () => {
    expect(interactor).toBeDefined();
  });

  describe('execute', () => {
    it('should create customer and return', async () => {
      const createDto: CreateCustomerDto = {
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '12345678900',
      };

      (
        customerRepository.findExistingCustomer as jest.Mock
      ).mockResolvedValueOnce(null);
      (customerMapper.mapFrom as jest.Mock).mockReturnValueOnce(createDto);

      const createdCustomer: Customer = { ...createDto, id: '1' };

      (customerRepository.create as jest.Mock).mockResolvedValueOnce(
        createdCustomer,
      );

      const result = await interactor.execute(createDto);

      expect(result).toEqual(createdCustomer);
      expect(customerRepository.findExistingCustomer).toHaveBeenCalledWith(
        createDto.cpf,
        createDto.email,
      );
      expect(customerMapper.mapFrom).toHaveBeenCalledWith(createDto);
      expect(customerRepository.create).toHaveBeenCalledWith(createDto);
    });

    it('should throw bad request exception if customer already exists', async () => {
      const createDto: CreateCustomerDto = {
        name: 'John Doe',
        email: 'john@example.com',
        cpf: '12345678900',
      };

      (
        customerRepository.findExistingCustomer as jest.Mock
      ).mockResolvedValueOnce({ id: '1' });

      await expect(interactor.execute(createDto)).resolves.toBeUndefined();

      expect(exceptionService.badRequestException).toHaveBeenCalledWith({
        message: 'Customer already exists with this cpf or email',
        code: 409,
      });
    });
  });
});
