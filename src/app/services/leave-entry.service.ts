import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { contentHeaders } from '../common/headers';
import 'rxjs/add/operator/map';

@Injectable()
export class LeaveEntryService {
private addLeaveEntry:string = "http://172.16.130.8:3001/addLeaveEntry";

  constructor(private http: Http) { }

  addLeave(entry_month,transaction,dd,hh,mm,leave,dates,id,entry_year,v,s,ctoh){
    let body = JSON.stringify({em:entry_month, t: transaction, dd: dd, hh: hh, mm: mm, l:leave, d: dates, id: id, ey: entry_year, v: v, s: s,cto: ctoh});
    console.log(body);
    return this.http.post(this.addLeaveEntry, body, {headers: contentHeaders}).map(res => res.json());   
  }
}
