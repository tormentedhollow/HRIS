import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  private _authUrl:string = "http://172.16.130.8:3001/authenticate";

  constructor(private http: Http) { }

  login(username, password) {
    let body = JSON.stringify({ username, password });
    return this.http.post(this._authUrl, body, {headers: contentHeaders}).map(res => res.json());
  }

  logout() {
        // remove user from local storage to log user out
        localStorage.clear();
  }

}
