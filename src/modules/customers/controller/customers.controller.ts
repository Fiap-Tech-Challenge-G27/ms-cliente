import { Controller, Post, Body } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { CustomerService } from '../app/customer.service';
import { CreateCustomerDto } from '../app/create-customer/create-customer.dto';

//import { UpdateCustomerDto } from '../app/update-customer/update-customer.dto';

@ApiTags('customers')
@Controller('customers')
export class CustomersController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.createCustomer(createCustomerDto);
  }
  /*
  @Get()
  findAll() {
    return this.customerService.createCustomer();
  }

  @Get(':cpf')
  findOne(@Param('cpf') cpf: string) {
    return this.findCustomer.execute(cpf);
  }

  @Patch(':cpf')
  update(
    @Param('cpf') cpf: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.updateCustomer.execute(cpf, updateCustomerDto);
  }

  @Delete(':cpf')
  remove(@Param('cpf') cpf: string) {
    return this.removeCustomer.execute(cpf);
  }*/
}
