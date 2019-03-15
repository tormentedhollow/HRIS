import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService {

  private _getEmp:string = "http://172.16.130.8:3001/employee";
  private _getEmp2:string = "http://172.16.130.8:3001/details";
  private _upEmp:string = "http://172.16.130.8:3001/update";

  constructor(private http: Http) { }

  getEmployee() {
        let body = {id: 1};
        return this.http.post(this._getEmp,body).map(res => res.json());
  }

  updateEmployee(pi, c, e, cs, we, v, tp, s, n, m){
    let body = {p: pi, c: c, e: e, cs: cs, we:we, v:v, tp:tp, s:s, n:n, m:m};
    return this.http.post(this._upEmp, body, {headers: contentHeaders}).map(res => res.json())
  } 
  getEmployeeDetails(id: number){
    let body = {id: id};
    return this.http.post(this._getEmp2, body, {headers: contentHeaders}).map(res => res.json())
  }   

}
