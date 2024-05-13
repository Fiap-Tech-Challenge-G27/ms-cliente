import { PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from '../create-customer/create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
