import { Inject, Injectable } from '@nestjs/common';
import { ICustomerRepository } from '../../core/repositories/customer.repository.abstract';
import { Customer } from '../../core/entities/customer.entity';
import { IExceptionService } from '../../../../shared/exceptions/exceptions.interface';

@Injectable()
export class FindCustomerInteractor {
  constructor(
    private readonly customerRepository: ICustomerRepository,

    @Inject(IExceptionService)
    private readonly exceptionService: IExceptionService,
  ) {}

  async execute(cpf: string): Promise<Customer> {
    try {
      const customer = await this.customerRepository.findOne(cpf);

      if (!customer) {
        this.exceptionService.notFoundException({
          message: 'Customer not found',
          code: 404,
        });
      }

      return customer;
    } catch (error) {
      this.exceptionService.internalServerErrorException({
        message: 'Error to find a customer',
        code: 500,
      });
    }
  }
}
