import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Customer } from 'src/app/models/customer.interface';
import { CustomersState } from './customers.state';

export const CUSTOMERS_STATE_NAME = 'customers';

const getCustomersState =
  createFeatureSelector<CustomersState>(CUSTOMERS_STATE_NAME);

export const getCustomers = createSelector(
  getCustomersState,
  (state): Customer[] => {
    return state.customers;
  }
);
