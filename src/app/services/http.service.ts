import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Customer } from '../models/customer.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private readonly http: HttpClient,
    private toastr: ToastrService
  ) {}

  private readonly url: string = 'https://dev-test-api.rinternal.com';

  public getCustomers(): Observable<Customer[]> {
    return this.http
      .get<Customer[]>(`${this.url}/Customer/GetCustomers`)
      .pipe(this.handleError());
  }

  public editCustomer(customer: Customer): Observable<Customer> {
    return this.http
      .post<Customer>(`${this.url}/Customer/UpdateCustomer`, customer)
      .pipe(this.handleError());
  }

  public deleteCustomer(elementsId: number[]): Observable<Customer> {
    return this.http
      .post<Customer>(`${this.url}/Customer/DeleteCustomers`, elementsId)
      .pipe(this.handleError());
  }

  public createCustomer(customer: Customer): Observable<Customer> {
    return this.http
      .post<Customer>(`${this.url}/Customer/CreateCustomer`, customer)
      .pipe(this.handleError());
  }

  private handleError() {
    return catchError((err) => {
      this.toastr.error(
        JSON.stringify(err),
        'Oops. An error with http request occurred'
      );
      return of(err);
    });
  }
}
