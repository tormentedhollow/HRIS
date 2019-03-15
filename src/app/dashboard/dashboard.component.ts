import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { FlexiListComponent } from './flexi-list/flexi-list.component';
import 'chart.js';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ DashboardService ],
  
})
export class DashboardComponent implements OnInit {

  mf={};
  birthday:Array<any>;
  agebracket:Array<any>;
  stepincrement:Array<any>;
  salarygrade:Array<any>;
  maritalstatus={};
  gender=[{
    labels:['Female', 'Male'],
    data:[0,0],
    type:'doughnut',
    options:{responsive: true,}
  }];
  months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  mo:any;
  constructor(private _dashboardService: DashboardService, private modalService: NgbModal) { }

  ngOnInit() {
    this.mo = new Date().getMonth() +1;
    this.getMF();
    this.getMaritalStatus();
    this.getAgeBracket();
    this.getBirthday();
    this.getStepIncrement();
    this.getSalaryGrade();
  }
  getStyleBday(dob){
    var d = new Date(dob).getDate();
    var n = new Date().getDate();
    if(d==n){
      return "#c3f2b5";
    }
  }
  getMF () {
    this._dashboardService.getMF()
      .subscribe(
        data => {this.mf = data;
                //this.gender[0].labels = ['Female ['+data.f+']','Male ['+data.m+']'];
                this.gender[0].data = [data.f,data.m];
              },
        error => console.log("Error HTTP GET Service"),
        () => {console.log(this.mf)},
      );

  }

   getBirthday() {
    this._dashboardService.getBirthday()
      .subscribe(
        data => {this.birthday = data.data;
              },
        error => console.log("Error HTTP GET Service"),
        () => {console.log(this.birthday)},
      );

  }

  getStepIncrement() {
    this._dashboardService.getStepIncrement()
      .subscribe(
        data => {
          this.stepincrement = data;
          this.stepincrement["labels"] = ['SI 1','SI 2','SI 3','SI 4','SI 5','SI 6','SI 7','SI 8'];
          this.stepincrement["type"] = 'pie';
          this.stepincrement["options"] = {responsive: true,};
              },
        error => console.log("Error HTTP GET Service"),
        () => {console.log(this.stepincrement)},
      );

  }

  getSalaryGrade() {
    this._dashboardService.getSalaryGrade()
      .subscribe(
        data => {
          this.salarygrade = data[0];
          this.salarygrade["labels"] = data[1].label;
          this.salarygrade["type"] = 'pie';
          this.salarygrade["options"] = {responsive: true,};
              },
        error => console.log("Error HTTP GET Service"),
        () => {console.log(this.salarygrade)},
      );

  }

  getAgeBracket() {
    this._dashboardService.getAgeBracket()
      .subscribe(
        data => {this.agebracket = data;
                this.agebracket["type"]='bar';
                this.agebracket["data"]={
                  datasets:[{
                    label:'# of Employee',
                    data:[data.two,data.three,data.four,data.five]
                  },{
                    label:'Average Age',
                    data:[data.ave,data.ave,data.ave,data.ave],
                    type:'line'
                  }],
                  labels:['Below 30','30 to 39','40 to 49','50 Above']
                };
                this.agebracket["options"]={
                  scales:{
                    yAxes:[{
                      ticks:{
                        beginAtZero: true
                      }
                    }]
                  }
                }
              },
        error => console.log("Error HTTP GET Service"),
        () => {console.log(this.agebracket)},
      );

  }

  getAge(bday){
    var birthday,today;
    birthday = new Date(bday).getFullYear();
    today = new Date().getFullYear();
    var age = (today - birthday);
    return age;
  }

  getMaritalStatus () {
    this._dashboardService.getMaritalStatus()
      .subscribe(
        data => {this.maritalstatus = data.data;
              this.maritalstatus["labels"] =[];
              this.maritalstatus["data"] =[];
              var d={};
              d["data"]=[];
              this.maritalstatus["type"] ='bar';
              this.maritalstatus["legend"] =true;
              this.maritalstatus["options"] ={
                  scaleShowVerticalLines: false,
                  responsive: true
                };
                var tot=0;
                for(var i=0;i<data.data.length;i++){
                  this.maritalstatus["labels"].push(data.data[i].cs);
                  d["data"].push(data.data[i].num);
                  tot=tot+data.data[i].num;
                }
                d["label"] ='Total Number ['+tot+']';
                this.maritalstatus["data"].push(d);
                console.log(this.maritalstatus["data"])
              },
        error => console.log("Error HTTP GET Service"),
        () => {console.log(this.maritalstatus)},
      );

  }

    private colors = [
    {
      backgroundColor: 'rgb(244, 235, 127)',
      borderColor: 'rgb(247, 235, 103)'
    }
  ];

  private colors2 = [
    {
      backgroundColor: 'rgb(255, 135, 135)',
      borderColor: 'rgb(247, 103, 103)'
    }
  ];
 
 


}
