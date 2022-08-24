import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { deleteCustomer, loadCustomers } from './state/customers.actions';
import { Store, select } from '@ngrx/store';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../models/customer.interface';
import { getCustomers } from './state/customers.selector';
import { Observable, takeUntil, tap } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { detailExpand } from '../shared/animations/detailExpand';
import { UnsubscribeService } from '../services/unsubscribe.service';
import { getLoading } from '../shared/state/shared.selector';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [detailExpand],
  providers: [UnsubscribeService],
})
export class CustomersComponent implements OnInit {
  @ViewChild(MatPaginator) private paginator: MatPaginator | null = null;
  @ViewChild(MatSort) private sort: MatSort | null = null;
  constructor(
    private store: Store,
    private readonly unsubscribe: UnsubscribeService
  ) {}
  public displayedColumns: string[] = [
    'select',
    'email',
    'name',
    'customerTID',
    'contactName',
    'contactTelephone',
    'creationDate',
  ];
  public expandedElement: Customer | null = null;
  public dataSource: MatTableDataSource<Customer> | null = null;
  public isLoadingSpinnerVisible$: Observable<boolean> = this.store.pipe(
    select(getLoading)
  );
  ngOnInit(): void {
    this.store.dispatch(loadCustomers());
    this.store
      .pipe(
        select(getCustomers),
        tap((customers: Customer[]) => {
          this.dataSource = new MatTableDataSource<Customer>(customers);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }),
        takeUntil(this.unsubscribe.destroy$)
      )
      .subscribe();
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  public selection: SelectionModel<Customer> = new SelectionModel<Customer>(
    true,
    []
  );

  public isAllSelected(): boolean {
    if (this.dataSource) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
    return false;
  }

  public toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    if (this.dataSource) {
      this.selection.select(...this.dataSource.data);
    }
  }

  public onDeleteBtnClick(): void {
    const selectedIds: number[] = this.selection.selected.map(
      (customer: Customer) => {
        return customer.id!;
      }
    );
    this.store.dispatch(deleteCustomer({ customersIDs: selectedIds }));
    this.selection.clear();
  }
}
