import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { CustomersComponent } from './customers.component';

const customersRoutes: Routes = [
  { path: '', component: CustomersComponent },
  {
    path: 'create',
    component: CustomerCreateComponent,
  },
  {
    path: 'edit',
    component: CustomerEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(customersRoutes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
