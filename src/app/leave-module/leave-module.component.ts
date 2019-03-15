import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { LeaveEntryService } from '../services/leave-entry.service';

@Component({
  selector: 'app-leave-module',
  templateUrl: './leave-module.component.html',
  styleUrls: ['./leave-module.component.css'],
  providers: [ EmployeeService ]
})
export class LeaveModuleComponent implements OnInit {

  Employees: Array<any>;
  Dates: Array<any>;
  staticAlertClosed = false;
  objectsWithGettersFilter: any = { Sname: null };
  skill: string;
  skills: Array<any> = [];
  close: string;
  
  constructor(private _employeeService: EmployeeService, private router: Router, private modalService: NgbModal) { }

  getEmployee () {
    this._employeeService.getEmployee()
      .subscribe(
        data => {this.Employees = data.data;
            if(this.Employees.length!=0){
              for(var c=0; c<this.Employees.length;c++){
               // this.Employees[c].lb = this.compute_lb(this.Employees[c].dates[0].dat);
               // this.Employees[c].lb_dedvl = this.compute_lb_ded(this.Employees[c].vl[0]);
               // this.Employees[c].lb_dedsl = this.compute_lb_ded(this.Employees[c].sl[0]);
              }
            }
        },
        error => console.log("Error HTTP GET Service"),
        () => {console.log(this.Employees)},
      );

  }

  open(item) {
    const modalRef = this.modalService.open(ModalContentLeave);
    modalRef.componentInstance.id = item.PI_ID;
    modalRef.componentInstance.Sname = item.Sname;
    modalRef.componentInstance.Fname = item.Fname;
    modalRef.componentInstance.index = item.index;
    modalRef.result.then((result) => {
      this.close = result;
      //console.log(result);
      this.Employees[result[0].index].vlded = this.Employees[result[0].index].vlded + result[0].vl;
      this.Employees[result[0].index].slded = this.Employees[result[0].index].slded + result[0].sl;
    });
  }

  ngOnInit() {
    this.getEmployee();
    setTimeout(() => this.staticAlertClosed = true, 5000);
  }

  addSkills(){
    this.skills.push(this.skill);
    this.skill = null;
  }

  removeSkills(index){
    this.skills.splice(index, 1);
  }

  newTab(item){
    var id = item.PI_ID;
    var string=item.PI_ID.toString();
    var enc="----------";
    function setCharAt(str,index,chr) {
      if(index > str.length-1) return str;
      return str.substr(0,index) + chr + str.substr(index+1);
    }
    function randomInt() {
      do{
        var x = Math.random() * (105 - 65) + 65;
      }while(x>73&&x<80);
      return x;
    }

    function crypt(div) {
      for(var ind=0; ind<string.length; ind++){
        for(var ctr=ind*3;ctr<(ind*3)+(div-1);ctr++){
          var x = randomInt();
          enc = setCharAt(enc,ctr, String.fromCharCode(x+17));
        }
        enc = setCharAt(enc,ctr,String.fromCharCode(string.charCodeAt(ind)+17));
      }
      for(var t=9;t>((string.length-1)*3)+(div-1);t--){
        enc = setCharAt(enc,t,String.fromCharCode(randomInt()+17));
      }
      if(div===1){
        if(string.length==1){
          for(var t=1;t<=5;t++){
            enc = setCharAt(enc,t,String.fromCharCode(randomInt()+17));
          }
        }else{
          for(var t=1;t<=2;t++){
            enc = setCharAt(enc,t,String.fromCharCode(randomInt()+17));
          }
          for(var t=4;t<=5;t++){
            enc = setCharAt(enc,t,String.fromCharCode(randomInt()+17));
          }
        }
      }
    }
    
    if(id%3===0){
      crypt(3);
    }
    else if(id%2===0){
      crypt(2);
    }else{
      crypt(1);
    }
    console.log(enc);
    


    //var newWindow = window.open('statement/'+enc);
    console.log(enc);
    this.router.navigate(['/home', 'statement', enc]); 
    
  }

}

@Component({
  selector: 'modal-dialog',
  template: `
    <div class="modal-header">
      <h5 class="modal-title">Entry -<i> {{Sname | uppercase}}, {{Fname | uppercase}}</i></h5>
      <button type="button" class="close" aria-label="Close" (click)="closeclick()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <div class="form-inline">
      <h6 class="col-sm-2">Month</h6>
      <select class="form-control col-sm-5" [(ngModel)]="entry_month" >
        <option *ngFor="let mo of month" value={{mo.value}}>{{mo.name}}</option>
      </select>
      <h6 class="col-sm-2">Year</h6>
      <select class="form-control col-sm-3" [(ngModel)]="entry_year" >
        <option *ngFor="let yr of year" value={{yr.value}}>{{yr.name}}</option>
      </select>
    </div>
      <br>
    <div class="form-inline">
      <h6 class="col-sm-3"><input type="checkbox" [(ngModel)]="multiple"> <span *ngIf="multiple">Multiple </span>Transaction</h6>
      <label class="radio-inline col-sm-3"><input type="radio" [(ngModel)]="transaction" value="0">Leave</label>
      <label class="radio-inline col-sm-2"><input type="radio" [(ngModel)]="transaction" value="1">Late</label><br>
      <label class="radio-inline col-sm-4"><input type="radio" [(ngModel)]="transaction" value="2">Monetization</label><br>
    </div>
      <div *ngIf="transaction==0">
        <br>
      <div class="form-inline">
        <h6 class="col-sm-4">Type of Leave</h6>
        <select class=" form-control col-sm-8" [(ngModel)]="leave">
          <option value="0">Sick Leave (SL)</option>
          <option value="1">Forced Leave (FL)</option>
          <option value="2">Special Privilege Leave (SPL)</option>
          <option value="3">Vacation Leave (VL)</option>
          <option value="4">Maternity Leave (ML)</option>
          <option value="5">Paternity Leave (PL)</option>
          <option value="6">Emergency Leave (EL)</option>
          <option value="7">CTO</option>
        </select>
      </div>
        <br>
      <div class="form-inline" >
        <h6 class="col-sm-3">Deduction</h6>
        <input type="number" class="form-control col-sm-3" [(ngModel)]="v" placeholder="VL" [disabled]="leave==2||leave==4||leave==5||leave==6||leave==7">
        <span class="col-sm-1"></span>
        <input type="number" class="form-control col-sm-3" [(ngModel)]="s" placeholder="SL" [disabled]="leave==2||leave==4||leave==5||leave==6||leave==7">
      </div>
        <br>
      <div class="form-inline">
        <h6 class="col-sm-3">Date</h6>
        <table class="table table-striped table-bordered table-condensed table-responsive col-sm-9">
          <tr>
          <td><input type="date" class="form-control" [(ngModel)]="dit" ></td>
          <td *ngIf="leave==7">
          <select class="form-control" [(ngModel)]="ctohalf">
          <option value=undefined>-</option>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
          </select>
          </td>
          <td><button class="btn-success form-control"  (click)="adddate()">+</button></td>
          </tr>
          <tr *ngFor="let date of dates; let i = index;">
          <td> {{date | date:'shortDate'}} </td>
            <td> <button type="button" class="btn btn-danger btn-circle" (click)="removedate(i)"><i class="fa fa-times"></i></button> </td>
          </tr>
        </table>
      </div>
      </div>
      <div *ngIf="transaction==1"><br>
        <div class="form-inline">
        <h6 class="col-sm-3">Late</h6>
          <input type="number" class="form-control col-sm-2" placeholder="dd" [(ngModel)]="dd" min="0"> <b>-</b>
          <input type="number" class="form-control col-sm-2" placeholder="hh" [(ngModel)]="hh" min="0" max="7"> <b>-</b>
          <input type="number" class="form-control col-sm-2" placeholder="mm" [(ngModel)]="mm" min="0" max="59">
        </div>
        <br>
      </div>

      <div *ngIf="transaction==2"><br>
        <div class="form-inline">
        <h6 class="col-sm-6">Monetization</h6>
          <input type="number" class="form-control col-sm-4" placeholder="Day(s)" [(ngModel)]="mntn" min="0">
        </div>
        <br>
      </div>
      <!--<div class="alert alert-danger alert-dismissable" *ngIf="error&&(this.entry_month===undefined||(this.leave===undefined && transaction==0)||(this.dates.length===0 && transaction==0)||((!(this.dd>0||this.hh>0||this.mm>0))&& transaction==1))">-->
      <div class="alert alert-danger alert-dismissable" *ngIf="error">
        <a href="#" class="close" data-dismiss="alert" aria-label="close" (click)="errorChange()">&times;</a>
        <strong>ERROR:</strong> <span *ngIf="transaction===undefined"><br>* Transaction - undefined</span>
            <span *ngIf="entry_month===undefined"><br>* Month - undefined</span>
            <span *ngIf="leave===undefined && transaction==0"><br>* Type of Leave - undefined</span>
            <span *ngIf="dates.length===0 && transaction==0"><br>* Date - null</span>
            <span *ngIf="(!(this.dd>0||this.hh>0||this.mm>0))&& transaction==1"><br>* Late - null</span>
            <span *ngIf="(!(this.dd>0))&& transaction==2"><br>* Day(s) - null</span>
            <span *ngIf="(!(this.v>0))&& (leave==0||leave==1||leave==3)"><br>* VL - null</span>
            <span *ngIf="(!(this.s>0))&& (leave==0||leave==1||leave==3)"><br>* SL - null</span>
      </div>
      
    </div>
    <div class="modal-footer">
      <span class="col-sm-6" *ngIf="success"><strong>SUCCESS:</strong> {{ct}} Entr<span *ngIf="ct==1">y</span><span *ngIf="ct>1">ies</span> Added!</span>
      <span class="col-sm-2"></span>
      <button type="button" class="btn btn-secondary col-sm-2" (click)="onSubmit()">Save</button>
      <button type="button" class="btn btn-secondary col-sm-2" (click)="closeclick()">Close</button>
    </div>
  `,
  providers: [ LeaveEntryService ]
})
export class ModalContentLeave implements OnInit{
  @Output() notify: EventEmitter<string> = new EventEmitter<string>(); 
  ct: number;
  error: boolean;
  success: boolean;
  now: number;
  dd: number;
  hh: number;
  v: number;
  s: number;
  mm: number;
  mntn: number;
  entry_month: number;
  entry_year: number;
  multiple: boolean;
  transaction: number;
  leave: number;
  month = [{name: 'January',value: 1},
          {name: 'February',value: 2},
          {name: 'March',value: 3},
          {name: 'April',value: 4},
          {name: 'May',value: 5},
          {name: 'June',value: 6},
          {name: 'July',value: 7},
          {name: 'August',value: 8},
          {name: 'September',value: 9},
          {name: 'October',value: 10},
          {name: 'November',value: 11},
          {name: 'December',value: 12},];
  acc= [];
  year=[];
  dates: Array<Date>= [];
  cto: Array<any>= [];
  ctohalf: any;
  dit: Date;
  result: any;
  @Input() id;
  @Input() Sname;
  @Input() Fname;
  @Input() index;
  constructor(private leaveentryService: LeaveEntryService,public activeModal: NgbActiveModal) {}

  closeclick(){
    this.acc[0].index= this.index;
    this.activeModal.close(this.acc);
  }

  adddate(){
    if(this.dit!=undefined&&this.entry_month!=undefined){
      //console.log("2017-"+this.entry_month+"-"+this.dit);
      //var d=new Date(this.entry_year+"-"+this.entry_month+"-"+this.dit)
      var d=new Date(this.dit)
      this.dates.push(d);
      this.cto.push(this.ctohalf);
      this.dit=undefined;
      console.log(this.cto);
    }else{
      this.error=true;
    }
  }
  removedate(index){
    this.dates.splice(index, 1);
    this.cto.splice(index, 1);
  }

  errorChange(){
    if(this.error){
      this.error=false;
    }else{
      this.error=true;
    }
  }

  successChange(){
    if(this.success){
      this.success=false;
    }else{
      this.success=true;
    }
  }

  onSubmit() {

    if(this.transaction==0){
      if(this.entry_month===undefined||this.leave===undefined||this.dates.length===0||((this.v==undefined||this.v==0)&&(this.s==undefined||this.s==0)&&(this.leave==0||this.leave==1||this.leave==3))){
        this.error=true;
      }
      else{
        //query here
        if(this.v==undefined){
          this.v=0;
        }
        if(this.s==undefined){
          this.s=0;
        }
        this.leaveentryService.addLeave(this.entry_month,this.transaction,this.dates.length,null,null,this.leave,this.dates,this.id,this.entry_year,this.v,this.s,this.cto)
          .subscribe(
            data => {this.result = data.data.insertId},
            error => console.log("Error HTTP GET Service"),
            //() =>  this.onProceed2.emit(this.result), //pass an event to parent
            ()=>this.success=true,
          );
          if(this.leave<2 || this.leave==3){
            this.acc[0].vl = this.acc[0].vl + this.v;
            this.acc[0].sl = this.acc[0].sl + this.s;
          }
          if(this.multiple){
            this.leave=undefined;
            this.dates=[];
            this.ct++;
            this.v=undefined;
            this.s=undefined;
          }else this.closeclick();
      }
    }
    else{
      console.log(this.transaction)
      if(this.entry_month===undefined||this.transaction===undefined||(this.transaction==1&&!(this.dd>0||this.hh>0||this.mm>0))||(this.transaction==2&&!(this.mntn>0))){
        this.error=true;
      }
      else if(this.transaction==2){
        //query here
        this.leaveentryService.addLeave(this.entry_month,this.transaction,this.mntn,0,0,null,null,this.id,this.entry_year,this.mntn,0,null)
          .subscribe(
            data => this.result = data.data.insertId,
            error => console.log("Error HTTP GET Service"),
            //() =>  this.onProceed2.emit(this.result), //pass an event to parent
            ()=>this.success=true,
          );
          this.acc[0].vl = this.acc[0].vl + this.mntn;
          if(this.multiple){
              this.mntn=undefined;
              this.ct++;
          }else this.closeclick();
      }
      else{
        if(this.dd===undefined){
          this.dd=0;
        }
        if(this.hh===undefined){
          this.hh=0;
        }else if(this.hh>7){
          this.hh=7;
        }
        if(this.mm===undefined){
          this.mm=0;
        }else if(this.mm>59){
          this.mm=59;
        }
        //query here
        this.leaveentryService.addLeave(this.entry_month,this.transaction,this.dd,this.hh,this.mm,null,null,this.id,this.entry_year,0,0,null)
          .subscribe(
            data => {this.acc[0].vl = this.acc[0].vl+data.acc.vl},
            error => console.log("Error HTTP GET Service"),
            //() =>  this.onProceed2.emit(this.result), //pass an event to parent
            ()=>this.success=true,
          );
          //this.acc[0].vl = this.acc[0].vl + this.mntn;
        if(this.multiple){
            this.dd=undefined;
            this.hh=undefined;
            this.mm=undefined;
            this.ct++;
        }else this.closeclick();
      }
    }
    this.notify.emit('Click from nested component');

  }

  ngOnInit() {
    this.acc.push({'vl' : 0, 'sl':0});
    console.log(this.acc);
    this.ct=0;
    var max = new Date().getFullYear();
    var min = max - 20;
    for (var i = max; i>=min; i--){
        this.year.push({name: i,value: i})
    }
    this.entry_month=(new Date().getMonth())+1;
    this.entry_year=new Date().getFullYear();
    this.error=false;
    this.success=false;
    this.multiple=false;
    console.log(this.id);

    
  }


}