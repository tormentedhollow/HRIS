import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class LeaveBalanceService {
private getLeaveBalance:string = "http://172.16.130.8:3001/getLeaveBalance";

  constructor(private http: Http) { }


  leave(id){
    let body = JSON.stringify({id: id});
    console.log(body);
    return this.http.post(this.getLeaveBalance, body, {headers: contentHeaders}).map(res => res.json());   
  }
}
