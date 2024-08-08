import { CustomerMapper } from './customer.mapper';
import { CustomerEntity } from '../entities/customer.entity';
import { CreateCustomerDto } from '../../app/create-customer/create-customer.dto';
import { UpdateCustomerDto } from '../../app/update-customer/update-customer.dto';

describe('CustomerMapper', () => {
  let mapper: CustomerMapper;

  beforeEach(() => {
    mapper = new CustomerMapper();
  });

  it('should map CreateCustomerDto to CustomerEntity', () => {
    const createDto: CreateCustomerDto = {
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '12345678900',
      address: "Rua ABC",
      phone: "11987654321"
    };

    const expectedCustomerEntity: CustomerEntity = {
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '12345678900',
      address: "Rua ABC",
      phone: "11987654321"
    };

    const mappedCustomerEntity = mapper.mapFrom(createDto);

    expect(mappedCustomerEntity).toEqual(expectedCustomerEntity);
  });

  it('should map UpdateCustomerDto to CustomerEntity', () => {
    const updateDto: UpdateCustomerDto = {
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '12345678900',
    };

    const expectedCustomerEntity: CustomerEntity = {
      name: 'John Doe',
      email: 'john@example.com',
      cpf: '12345678900',
      address: "Rua ABC",
      phone: "11987654321"
    };

    const mappedCustomerEntity = mapper.mapFrom(updateDto);

    expect(mappedCustomerEntity).toEqual(expectedCustomerEntity);
  });
});
