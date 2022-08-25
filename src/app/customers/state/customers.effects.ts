import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  mergeMap,
  of,
  tap,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { Customer } from 'src/app/models/customer.interface';
import { HttpService } from 'src/app/services/http.service';
import { setLoadingSpinner } from 'src/app/shared/state/shared.actions';
import {
  loadCustomers,
  loadCustomersSuccess,
  deleteCustomer,
  deleteCustomerSuccess,
  createCustomer,
  createCustomerSuccess,
  editCustomer,
  editCustomerSuccess,
  dummyAction,
} from './customers.actions';
import { select, Store } from '@ngrx/store';
import { getCustomers } from './customers.selector';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class CustomersEffects {
  constructor(
    private actions$: Actions,
    private httpService: HttpService,
    private store: Store,
    private toastr: ToastrService,
    private router: Router
  ) {}

  public loadCustomers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadCustomers),
      tap(() => this.store.dispatch(setLoadingSpinner({ status: true }))),
      withLatestFrom(this.store.pipe(select(getCustomers))),
      mergeMap(([action, customers]) => {
        if (customers.length < 2) {
          return this.httpService.getCustomers().pipe(
            map((customers: Customer[]) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return loadCustomersSuccess({ customers });
            }),
            catchError((errResp) => {
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return of(errResp);
            })
          );
        }
        this.store.dispatch(setLoadingSpinner({ status: false }));
        return of(dummyAction());
      })
    );
  });

  public addCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createCustomer),
      mergeMap((action) => {
        return this.httpService.createCustomer(action.customer).pipe(
          map((response) => {
            const customer: Customer = {
              ...action.customer,
              id: response.id,
              creationDate: response.creationDate,
              softwares: response.softwares,
            };
            return createCustomerSuccess({ customer });
          })
        );
      })
    );
  });

  public editCustomer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editCustomer),
      mergeMap((action) => {
        return this.httpService.editCustomer(action.customer).pipe(
          map((response) => {
            const customer: Customer = {
              ...action.customer,
              softwares: response.softwares,
            };
            return editCustomerSuccess({ customer });
          })
        );
      })
    );
  });

  public deleteCustomers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteCustomer),
      switchMap((action) => {
        return this.httpService.deleteCustomer(action.customersIDs).pipe(
          map(() => {
            return deleteCustomerSuccess({ customersIDs: action.customersIDs });
          })
        );
      })
    );
  });

  public createRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(createCustomerSuccess),
        tap(() => {
          this.router.navigate(['/customers']);
          this.toastr.success('Customer was successfully created');
        })
      );
    },
    { dispatch: false }
  );

  public editRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(editCustomerSuccess),
        tap(() => {
          this.router.navigate(['/customers']);
          this.toastr.success('Customer was successfully edited');
        })
      );
    },
    { dispatch: false }
  );

  public deleteNotify$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deleteCustomerSuccess),
        tap(() => {
          this.toastr.info('Successful deletion');
        })
      );
    },
    { dispatch: false }
  );
}
