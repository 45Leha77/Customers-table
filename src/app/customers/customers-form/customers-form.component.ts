import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  Input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, of, takeUntil } from 'rxjs';
import { UnsubscribeService } from 'src/app/services/unsubscribe.service';
import { Customer } from '../../models/customer.interface';

@Component({
  selector: 'app-customers-form',
  templateUrl: './customers-form.component.html',
  styleUrls: ['./customers-form.component.scss'],
  providers: [UnsubscribeService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomersFormComponent implements OnInit {
  constructor(private unsubscribe: UnsubscribeService) {}
  @Output() submit: EventEmitter<Customer> = new EventEmitter<Customer>();
  @Input() customerData: Observable<Customer | null> = of(null);
  public softwareIds: Number[] = [];
  public form = new FormGroup<any>({
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    customerTID: new FormControl(null, [Validators.required]),
    contactName: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
    ]),
    contactTelephone: new FormControl(null, [Validators.minLength(7)]),
  });
  private customer: Customer | null = null;

  public onFormSubmit(event: Event): void {
    event.stopPropagation();
    const customer: Customer = {
      ...this.customer,
      ...this.form.value,
      softwareIds: this.softwareIds,
    };
    this.submit.emit(customer);
  }

  public addSoftware(softwareId: number): void {
    this.softwareIds = [...this.softwareIds, softwareId];
  }

  ngOnInit(): void {
    this.customerData
      .pipe(takeUntil(this.unsubscribe.destroy$))
      .subscribe((customer) => {
        if (customer) {
          this.updateForm(customer);
          this.customer = customer;
        }
      });
  }

  private updateForm(data: Customer): void {
    this.form.patchValue({
      name: data.name,
      email: data.email,
      customerTID: data.customerTID,
      contactName: data.contactName,
      contactTelephone: data.contactTelephone,
    });
    if (data.softwares) {
      const softwareIds: any[] = data.softwares.map(
        (softwares) => softwares.softwareId
      );
      this.softwareIds = [...this.softwareIds, ...softwareIds];
    }
  }
}
