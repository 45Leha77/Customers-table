import { Customer } from 'src/app/models/customer.interface';

export interface CustomersState {
  customers: Customer[];
}

export const initialState: CustomersState = {
  customers: [],
};
