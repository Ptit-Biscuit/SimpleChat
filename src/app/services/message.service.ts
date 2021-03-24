import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {Message} from '../models/message';
import {merge, Observable, of} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private storageKey = 'SimpleChat-messages';
  messages$: Observable<Message[]>;

  constructor(private storageService: StorageService) {
    this.messages$ =
      merge(
        of(storageService.getStorage<Message[]>(this.storageKey)),
        this.storageService.changes$.pipe(
          filter(storage => storage.key === this.storageKey),
          map(storage => storage.value as Message[]),
        )
      );
  }

  public send(message: Message): void {
    const messages = this.storageService.getStorage<Message[]>(this.storageKey);
    this.storageService.store(this.storageKey, (messages || []).concat(message));
  }

  public delete(message: Message): void {
    const messages = this.storageService.getStorage<Message[]>(this.storageKey);
    this.storageService.store(this.storageKey, (messages || []).filter(m => !(m.user === message.user && m.value === message.value)));
  }

  public deleteAll(): void {
    this.storageService.clear(this.storageKey);
  }
}
