import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { CustomerService } from '../app/customer.service';
import { CreateCustomerDto } from '../app/create-customer/create-customer.dto';
import { UpdateCustomerDto } from '../app/update-customer/update-customer.dto';

@ApiTags('customers')
@UsePipes(new ValidationPipe())
@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.createCustomer(createCustomerDto);
  }

  @Get()
  findAll() {
    return this.customerService.findAllCustomers();
  }

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.customerService.findCustomer(cpf);
  }

  @Patch(':cpf')
  update(
    @Param('cpf') cpf: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.updateCustomer(cpf, updateCustomerDto);
  }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    return this.customerService.removeCustomer(cpf);
  }
}
