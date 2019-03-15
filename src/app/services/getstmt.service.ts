import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { contentHeaders } from '../common/headers';
import 'rxjs/add/operator/map';

@Injectable()
export class GetstmtService {
private getStmt:string = "http://172.16.130.8:3001/getStmt";
  constructor(private http: Http) { }

  getStatement(id,date){
    let body = JSON.stringify({id: id, date: date});
    console.log(body);
    return this.http.post(this.getStmt, body, {headers: contentHeaders}).map(res => res.json());   
  }

}
