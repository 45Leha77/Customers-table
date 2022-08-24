import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class UnsubscribeService implements OnDestroy {
  private readonly destroySubject = new Subject<void>();
  public readonly destroy$ = this.destroySubject.asObservable();
  public ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
