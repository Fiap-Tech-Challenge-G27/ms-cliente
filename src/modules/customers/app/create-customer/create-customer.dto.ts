import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email should not be empty' })
  @IsEmail({}, { message: 'Email must be an email' })
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'CPF should not be empty' })
  @IsString()
  @Length(11, 11, { message: 'CPF must be exactly 11 characters' })
  readonly cpf: string;
}
