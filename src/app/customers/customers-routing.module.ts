import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerCreateComponent } from './customer-create-page/customer-create.component';
import { CustomerEditComponent } from './customer-edit-page/customer-edit.component';
import { CustomersComponent } from './customers.component';

const customersRoutes: Routes = [
  { path: '', component: CustomersComponent },
  {
    path: 'create',
    component: CustomerCreateComponent,
    title: 'Creating Customer',
  },
  {
    path: 'edit',
    component: CustomerEditComponent,
    title: 'Editing Customer',
  },
];

@NgModule({
  imports: [RouterModule.forChild(customersRoutes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
