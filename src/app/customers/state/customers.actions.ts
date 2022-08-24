import { createAction, props } from '@ngrx/store';
import { Customer } from 'src/app/models/customer.interface';

export const LOAD_CUSTOMERS = '[Customers] load customers';
export const LOAD_CUSTOMERS_SUCCESS = '[Customers] load customers success';

export const CREATE_CUSTOMER = '[Customers] create customer';
export const CREATE_CUSTOMER_SUCCESS = '[Customers] create customer success';

export const EDIT_CUSTOMER = '[Customers] edit customer';
export const EDIT_CUSTOMER_SUCCESS = '[Customers] edit customer success';

export const DELETE_CUSTOMER = '[Customers] delete customer';
export const DELETE_CUSTOMER_SUCCESS = '[Customers] delete customer success';

export const loadCustomers = createAction(LOAD_CUSTOMERS);
export const loadCustomersSuccess = createAction(
  LOAD_CUSTOMERS_SUCCESS,
  props<{ customers: Customer[] }>()
);

export const createCustomer = createAction(
  CREATE_CUSTOMER,
  props<{ customer: Customer }>()
);
export const createCustomerSuccess = createAction(
  CREATE_CUSTOMER_SUCCESS,
  props<{ customer: Customer }>()
);

export const editCustomer = createAction(
  EDIT_CUSTOMER,
  props<{ customer: Customer }>()
);
export const editCustomerSuccess = createAction(
  EDIT_CUSTOMER_SUCCESS,
  props<{ customer: Customer }>()
);

export const deleteCustomer = createAction(
  DELETE_CUSTOMER,
  props<{ customersIDs: number[] }>()
);
export const deleteCustomerSuccess = createAction(
  DELETE_CUSTOMER_SUCCESS,
  props<{ customersIDs: number[] }>()
);

export const dummyAction = createAction('[dummy action]');
