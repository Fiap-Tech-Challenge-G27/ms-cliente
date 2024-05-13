import { Inject, Injectable } from '@nestjs/common';
import { ICustomerRepository } from '../../core/repositories/customer.repository.abstract';
import { Customer } from '../../core/entities/customer.entity';
import { IExceptionService } from '../../../../shared/exceptions/exceptions.interface';

@Injectable()
export class FindAllCustomersInteractor {
  constructor(
    private readonly customerRepository: ICustomerRepository,

    @Inject(IExceptionService)
    private readonly exceptionService: IExceptionService,
  ) {}

  async execute(): Promise<Customer[]> {
    try {
      const customers = await this.customerRepository.findAll();

      if (!customers) {
        this.exceptionService.notFoundException({
          message: 'Customers not found',
          code: 404,
        });
      }

      return customers;
    } catch (error) {
      this.exceptionService.internalServerErrorException({
        message: 'Error to find all customers',
        code: 500,
      });
    }
  }
}
