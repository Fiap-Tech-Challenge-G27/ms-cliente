import { Entity } from '../../../../shared/core/entity';

export interface Customer extends Entity {
  id?: string;
  name?: string;
  email?: string;
  cpf?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CustomerEntity extends Entity {
  id?: string;
  name: string;
  email: string;
  cpf: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(name: string, email: string, cpf: string) {
    super();
    this.name = name;
    this.email = email;
    this.cpf = cpf;
  }
}
