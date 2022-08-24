import { CustomersReducer } from '../customers/state/customers.reducer';
import { Customer } from '../models/customer.interface';
import { SharedReducer } from '../shared/state/shared.reducer';
import { SharedState } from '../shared/state/shared.state';

export interface AppState {
  customers: Customer[];
  shared: SharedState;
}

export const AppReducer = {
  customers: CustomersReducer,
  shared: SharedReducer,
};
