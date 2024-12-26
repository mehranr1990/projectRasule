import {Injectable} from '@angular/core';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserStore {


  constructor() {
  }

  // --------------------------------------------
  // ------------- User Information -------------
  // --------------------------------------------
  private _isAuthenticated: boolean = false;
  get isAuthenticated() {
    return this._isAuthenticated;
  }

  set isAuthenticated(status: boolean) {
    if (!status) {
      this.removeUser();
    }
    this._isAuthenticated = status;
  }

  private _user: User;

  get info() {
    return this._user;
  }

  set info(user: Partial<User>) {
    this._user = {...this._user, ...user};
    console.log('asd');
    if (this._user?.token) {
      // this._user.username = user.username!
      this.isAuthenticated = true;
      
      localStorage.setItem('accessToken', JSON.stringify(this._user.token));
    }
  }

  removeUser() {
    this._user = {
      id: 0,
      username: 'noUsername',
      fullName: 'بدون کاربر',
      firstName: 'بدون',
      lastName: 'کاربر',
      token: '',
      role:[]
    };
    this._isAuthenticated = false;
    //localStorage.removeItem('accessToken');
    localStorage.clear();
  }


}
