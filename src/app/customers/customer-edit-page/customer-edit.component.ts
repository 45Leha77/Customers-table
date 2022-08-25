import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map, withLatestFrom, of, Observable, concatMap } from 'rxjs';
import { Customer } from 'src/app/models/customer.interface';
import { editCustomer, loadCustomers } from '../state/customers.actions';
import { getCustomers } from '../state/customers.selector';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerEditComponent {
  constructor(private store: Store, private route: ActivatedRoute) {
    this.store.dispatch(loadCustomers());
  }
  public customer: Observable<Customer> = this.store.pipe(
    select(getCustomers),
    withLatestFrom(
      this.route.queryParamMap.pipe(
        map((params): number => {
          return +params.get('id')!;
        })
      )
    ),
    concatMap(([customers, id]) => {
      const customer: Customer | undefined = customers.find(
        (customer) => customer.id == id
      );
      return of(customer!);
    })
  );

  public onCustomersFormSubmit(customer: Customer): void {
    this.store.dispatch(editCustomer({ customer }));
  }
}
