import { Inject, Injectable } from '@nestjs/common';
import { ICustomerRepository } from '../../core/repositories/customer.repository.abstract';
import { IExceptionService } from '../../../../shared/exceptions/exceptions.interface';

@Injectable()
export class RemoveCustomerInteractor {
  constructor(
    private readonly customerRepository: ICustomerRepository,

    @Inject(IExceptionService)
    private readonly exceptionService: IExceptionService,
  ) {}

  async execute(cpf: string): Promise<void> {
    try {
      await this.customerRepository.remove(cpf);
    } catch (error) {
      this.exceptionService.internalServerErrorException({
        message: 'Error to remove a customer',
        code: 500,
      });
    }
  }
}
