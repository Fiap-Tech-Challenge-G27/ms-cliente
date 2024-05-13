import { Inject, Injectable } from '@nestjs/common';
import { ICustomerRepository } from '../../core/repositories/customer.repository.abstract';
import { Customer, CustomerEntity } from '../../core/entities/customer.entity';
import { CustomerMapper } from '../../core/mappers/customer.mapper';
import { IExceptionService } from '../../../../shared/exceptions/exceptions.interface';
import { UpdateCustomerDto } from './update-customer.dto';

@Injectable()
export class UpdateCustomerInteractor {
  constructor(
    private readonly customerRepository: ICustomerRepository,
    private readonly customerMapper: CustomerMapper,
    @Inject(IExceptionService)
    private readonly exceptionService: IExceptionService,
  ) {}

  async execute(cpf: string, dto: UpdateCustomerDto): Promise<Customer> {
    try {
      const updateCustomer = await this.customerRepository.findOne(cpf);

      if (!updateCustomer) {
        this.exceptionService.notFoundException({
          message: 'Customer not found',
          code: 404,
        });
      }

      const customer: Customer = {
        ...dto,
      };

      return this.customerRepository.update(cpf, customer);
    } catch (error) {
      this.exceptionService.internalServerErrorException({
        message: 'Error to update a customer',
        code: 500,
      });
    }
  }
}
