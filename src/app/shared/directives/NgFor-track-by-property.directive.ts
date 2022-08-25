import { NgForOf } from '@angular/common';
import { Directive, Host, Input } from '@angular/core';

@Directive({
  selector: '[ngForTrackByProperty]',
})
export class TrackByPropertyDirective {
  private _propertyName: string = '';

  constructor(@Host() private readonly _ngFor: NgForOf<any>) {
    this._ngFor.ngForTrackBy = (_: number, item: any) =>
      this._propertyName ? item[this._propertyName] : item;
  }

  @Input('ngForTrackByProperty')
  public set propertyName(value: string | null) {
    this._propertyName = value ?? '';
  }
}
