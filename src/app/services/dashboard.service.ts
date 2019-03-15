import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class DashboardService {

  private _getMF:string = "http://172.16.130.8:3001/getMaleFemale";
  private _getMaritalStatus:string = "http://172.16.130.8:3001/getMaritalStatus";
  private _getBirthday:string = "http://172.16.130.8:3001/getBirthday";
  private _getAgeBracket:string = "http://172.16.130.8:3001/getAgeBracket";
  private _getStepIncrement:string = "http://172.16.130.8:3001/getStepIncrement";
  private _getSalaryGrade:string = "http://172.16.130.8:3001/getSalaryGrade";
  constructor(private http: Http) { }
  
  getMF() {
        let body = {};
        return this.http.post(this._getMF,body).map(res => res.json());
  }

  getMaritalStatus() {
        let body = {};
        return this.http.post(this._getMaritalStatus,body).map(res => res.json());
  }

  getBirthday() {
        let body = {};
        return this.http.post(this._getBirthday,body).map(res => res.json());
  }
  getAgeBracket() {
        let body = {};
        return this.http.post(this._getAgeBracket,body).map(res => res.json());
  }

  getStepIncrement() {
      let body = {};
      return this.http.post(this._getStepIncrement,body).map(res => res.json());
 }
  getSalaryGrade() {
      let body = {};
      console.log("sg");
      return this.http.post(this._getSalaryGrade,body).map(res => res.json());
 }
}
