import { Inject, Injectable } from '@nestjs/common';
import { ICustomerRepository } from '../../core/repositories/customer.repository.abstract';
import { CreateCustomerDto } from './create-customer.dto';
import { Customer } from '../../core/entities/customer.entity';
import { CustomerMapper } from '../../core/mappers/customer.mapper';
import { IExceptionService } from '../../../../shared/exceptions/exceptions.interface';
import { validateOrReject } from 'class-validator';

@Injectable()
export class CreateCustomerInteractor {
  constructor(
    private readonly customerRepository: ICustomerRepository,
    private readonly customerMapper: CustomerMapper,
    @Inject(IExceptionService)
    private readonly exceptionService: IExceptionService,
  ) {}

  async execute(dto: CreateCustomerDto): Promise<Customer> {
    try {
      await validateOrReject(dto);

      const { cpf, email } = dto;

      const customerAlreadyExists =
        await this.customerRepository.findExistingCustomer(cpf, email);

      if (customerAlreadyExists) {
        this.exceptionService.badRequestException({
          message: 'Customer already exists with this cpf or email',
          code: 409,
        });
      }

      const customer = this.customerMapper.mapFrom(dto);

      return this.customerRepository.create(customer);
    } catch (error) {
      this.exceptionService.internalServerErrorException({
        message: 'Error to create a customer',
        code: 500,
      });
    }
  }
}
