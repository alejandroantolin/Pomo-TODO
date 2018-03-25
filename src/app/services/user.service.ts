import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';

const API = {
  endpoint: 'http://127.0.0.1:3000/',
  login: 'login',
  register: 'register',
  getUsers: 'users'
};

@Injectable()
export class UserService {

  constructor(private _http: HttpClient) { }

  login(user: User): Observable<any> {
    return this._http
      .post(`${API.endpoint}${API.login}`, user).map((res: Response) => {
        return res;
      });
  }

  register(user: User): Observable<any> {
    return this._http
      .post(`${API.endpoint}${API.register}`, user).map((res: Response) => {
        return res;
      });
  }

  getUsers(): Observable<any> {
    return this._http
      .get(`${API.endpoint}${API.getUsers}`).map((res: Response) => {
        return res;
      });
  }

}
