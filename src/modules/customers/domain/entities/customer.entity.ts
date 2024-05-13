import { Entity } from 'src/shared/core/entity';

export interface Customer extends Entity {
  name: string;
  email: string;
  cpf: string;
  createdAt?: Date;
  updatedAt?: Date;
}
