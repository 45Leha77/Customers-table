import { Action, createReducer, on } from '@ngrx/store';
import { Customer } from 'src/app/models/customer.interface';
import {
  createCustomerSuccess,
  deleteCustomerSuccess,
  editCustomerSuccess,
  loadCustomersSuccess,
} from './customers.actions';
import { CustomersState, initialState } from './customers.state';

const _customersReducer = createReducer(
  initialState,
  on(loadCustomersSuccess, (state, action) => {
    return {
      ...state,
      customers: action.customers,
    };
  }),
  on(deleteCustomerSuccess, (state, action) => {
    let updatedCustomers: Customer[] = state.customers;
    action.customersIDs.forEach((id: number) => {
      updatedCustomers = updatedCustomers.filter((customer: Customer) => {
        return customer.id !== id;
      });
    });
    return {
      ...state,
      customers: updatedCustomers,
    };
  }),
  on(createCustomerSuccess, (state, action) => {
    return {
      ...state,
      customers: [...state.customers, action.customer],
    };
  }),
  on(editCustomerSuccess, (state, action) => {
    const updatedCustomers: Customer[] = state.customers.map(
      (customer: Customer) => {
        return action.customer.id === customer.id ? action.customer : customer;
      }
    );
    return {
      ...state,
      customers: [...updatedCustomers],
    };
  })
);

export function CustomersReducer(
  state: CustomersState | undefined,
  action: Action
) {
  return _customersReducer(state, action);
}
