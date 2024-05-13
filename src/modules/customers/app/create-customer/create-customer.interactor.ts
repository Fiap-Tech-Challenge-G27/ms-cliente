import { Inject, Injectable } from '@nestjs/common';
import { ICustomerRepository } from '../../core/repositories/customer.repository.abstract';
import { CreateCustomerDto } from './create-customer.dto';
import { Customer } from '../../core/entities/customer.entity';
import { CustomerMapper } from '../../core/mappers/customer.mapper';
import { IExceptionService } from '../../../../shared/exceptions/exceptions.interface';

@Injectable()
export class CreateCustomerInteractor {
  constructor(
    private readonly customerRepository: ICustomerRepository,
    private readonly customerMapper: CustomerMapper,
    @Inject(IExceptionService)
    private readonly exceptionService: IExceptionService,
  ) {}

  async execute(dto: CreateCustomerDto): Promise<Customer> {
    const { cpf } = dto;

    const customerAlreadyExists = await this.customerRepository.findOne(cpf);

    if (customerAlreadyExists) {
      this.exceptionService.badRequestException({
        message: 'Customer already exists with this cpf',
        code: 400,
      });
    }
    const customer = this.customerMapper.mapFrom(dto);

    return this.customerRepository.create(customer);
  }
}
