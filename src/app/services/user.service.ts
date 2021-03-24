import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser = '';

  constructor() {
  }

  setUser(username: any): void {
    this.currentUser = username;
  }
}
