import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Customer } from '../../models/customer.interface';
import { Store } from '@ngrx/store';
import { createCustomer } from '../state/customers.actions';

@Component({
  selector: 'app-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerCreateComponent {
  constructor(private store: Store) {}
  public onCustomersFormSubmit(customer: Customer): void {
    this.store.dispatch(createCustomer({ customer }));
  }
}
