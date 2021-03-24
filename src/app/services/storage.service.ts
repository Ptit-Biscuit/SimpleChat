import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements OnDestroy {
  private onSubject = new Subject<{ key: string, value: any }>();
  public changes$ = this.onSubject.asObservable().pipe(share());

  constructor() {
    window.addEventListener('storage', this.storageEventListener.bind(this));
  }

  public getStorage<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key)) as T;
  }

  public store(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
    this.onSubject.next({key, value: data});
  }

  public clear(key): void {
    localStorage.removeItem(key);
    this.onSubject.next({key, value: null});
  }

  private storageEventListener(event: StorageEvent): void {
    if (event.storageArea === localStorage) {
      let v;
      try {
        v = JSON.parse(event.newValue);
      } catch (e) {
        v = event.newValue;
      }
      this.onSubject.next({key: event.key, value: v});
    }
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
    this.onSubject.complete();
  }

}
