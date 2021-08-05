import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from './shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  apiKey: string = 'AIzaSyB_k4wGL6FPlaBkB4U6e5rGzR9zuIYNm2A';
  registerUrl: string = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
  loginUrl: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`

  constructor(
    private http: HttpClient
  ) { }

  register(displayName: string, email: string, password: string) {

    const data = {
      email,
      password,
      returnSecureToken: true,
      displayName: displayName,
      headers: {
        'content-type': 'application/json',

      },
    }
    return this.http.post<IUser>(`${this.registerUrl}`, data);
  }


  login(email: string, password: string) {
    const data = {
      email,
      password,
      returnSecureToken: true,
      headers: {
        'content-type': 'application/json',

      },
    }
    return this.http.post<IUser>(`${this.loginUrl}`, data);

  }

  logout() {

    localStorage.setItem('auth', '');
  }

  getUserData() {

    try {
      let data = JSON.parse(localStorage.getItem('auth')!);
      
      return {
        isAuthenticated: Boolean(data.idToken),
        email: data.email,
        displayName: data.displayName,
        idToken: data.idToken,
        localId: data.localId

      };

    } catch (error) {
      return {
        isAuthenticated: false,
        email: ''
      };
    }

  }
}
