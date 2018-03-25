import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const API = {
  endpoint: 'http://localhost:3000/',
  checkMongoConnection: 'checkMongoConnection'
};

@Injectable()
export class CountdownService {

  constructor(private _http: HttpClient) { }

  checkMongoConnection(): Observable<any> {
    return this._http
      .get(`${API.endpoint}${API.checkMongoConnection}`).map((res: Response) => {
        console.log(res);
        return res;
      });
  }
}
