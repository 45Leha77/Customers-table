import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CustomersReducer } from './state/customers.reducer';
import { CustomersEffects } from './state/customers.effects';
import { CUSTOMERS_STATE_NAME } from './state/customers.selector';

import { RouterModule } from '@angular/router';
import { CustomersRoutingModule } from './customers-routing.module';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomersComponent } from './customers.component';
import { SharedModule } from '../shared/shared.module';
import { CustomerCreateComponent } from './customer-create/customer-create.component';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomersFormComponent } from './customers-form/customers-form.component';

@NgModule({
  declarations: [
    CustomersComponent,
    CustomerCreateComponent,
    CustomerEditComponent,
    CustomersFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSortModule,
    MatIconModule,
    MatSliderModule,
    SharedModule,
    FlexLayoutModule,
    StoreModule.forFeature(CUSTOMERS_STATE_NAME, CustomersReducer),
    EffectsModule.forFeature([CustomersEffects]),
  ],
})
export class CustomersModule {}
