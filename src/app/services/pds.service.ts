import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { contentHeaders } from '../common/headers';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PdsService {

  private _addPDS:string = "http://172.16.130.8:3001/addPDS";
  private _addPDS2:string = "http://172.16.130.8:3001/addPDS2";
  private _addPDS3:string = "http://172.16.130.8:3001/addPDS3";
  private _addPDS4:string = "http://172.16.130.8:3001/addPDS4";

  constructor(private http: Http) { }


  addPDS1(fvalue, children, education){
    let body = JSON.stringify({f:fvalue, c: children, e: education});
    console.log(body);
    return this.http.post(this._addPDS, body, {headers: contentHeaders}).map(res => res.json());   
  }

  addPDS2(lastId, cse, we){
    let body = JSON.stringify({id:lastId, c: cse, w: we});
    console.log(body);
    return this.http.post(this._addPDS2, body, {headers: contentHeaders}).map(res => res.json());   
  }

  addPDS3(lastId, voluntary, trainings, skills, nonacademic, membership){
    let body = JSON.stringify({id:lastId, v: voluntary, t: trainings, s: skills, n: nonacademic, m: membership});
    console.log(body);
    return this.http.post(this._addPDS3, body, {headers: contentHeaders}).map(res => res.json());   
  }

   addPDS4(questions){
    let body = JSON.stringify({q: questions});
    console.log(body);
    return this.http.post(this._addPDS4, body, {headers: contentHeaders}).map(res => res.json());   
  }
  
}
