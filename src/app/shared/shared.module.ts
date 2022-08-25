import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { TrackByPropertyDirective } from './directives/NgFor-track-by-property.directive';

@NgModule({
  declarations: [LoaderComponent, TrackByPropertyDirective],
  imports: [CommonModule],
  exports: [LoaderComponent, TrackByPropertyDirective],
})
export class SharedModule {}
