import mongoose, { Document, Schema } from 'mongoose';

export interface ICustomer extends Document {
  name: string;
  email: string;
  cpf: string;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  cpf: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Customer = mongoose.model<ICustomer>('Customer', CustomerSchema);

export default Customer;
