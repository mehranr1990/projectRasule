import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserStore } from '../stores/user.store';
import { lastValueFrom, map, Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly api: ApiService,
    private readonly userStore: UserStore
  ) {}

  login(username: string, password: string) {
    return this.api.post('/auth/login', { username, password }).pipe(
      
      map(async (resp) => {
        console.log(resp);
        
    localStorage.setItem('token',resp.token)
        
        this.userStore.info = await lastValueFrom(
          this.claimUserProfile(resp.token, username)
          
        );
      
        return resp;
      })
    );
  }

  logout() {
    this.userStore.removeUser();
  }

  register(payload: {
    firstname: string;
    lastname: string;
    username: string;
    password: string;
  }) {
    // const {firstname, lastname, username, password} = payload;
    return this.api.post('/auth/register', payload);
  }

  claimUserProfile(token: string, username: string): Observable<User> {
    
    
    const headers: HttpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + token,
    });
    return this.api
      .get(`/User/GetUserByUserName?userName=${username}`, { headers })
      .pipe(
        map((resp) => {
          return {
            id: resp.id,
            username: resp.userName,
            fullName: resp.usr_Firstname + ' ' + resp.usr_Lastname,
            firstName: resp.name,
            lastName: resp.usr_Lastname,
            token: token,
            role: ['test1', 'test2'],
          };
        })
      );
  }
}
