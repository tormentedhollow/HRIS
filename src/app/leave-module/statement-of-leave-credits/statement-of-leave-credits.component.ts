import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LeaveBalanceService } from '../../services/leave-balance.service';
import { GetstmtService } from '../../services/getstmt.service';

@Component({
  selector: 'app-statement-of-leave-credits',
  templateUrl: './statement-of-leave-credits.component.html',
  styleUrls: ['./statement-of-leave-credits.component.css'],
  providers: [ LeaveBalanceService,GetstmtService ]
})
export class StatementOfLeaveCreditsComponent implements OnInit {
  id:any;
  enc:string;
  name:any;
  fday:any;
  data=[];
  stmt={};
  tf=false;
  b_vl=0.0;
  b_sl=0.0;
  monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  trans=["Leave","Late","Monetization"];
  leavetype=["SL","FL","SPL","VL","ML","PL","EL","CTO"];
  constructor(private route: ActivatedRoute, private _leaveBalanceService: LeaveBalanceService, private _getstmtService: GetstmtService) { }

  decrypt(enc){
    var dec="";
    //var ct=0;
    for(var i=0; i<enc.length;i++){
      var num=enc.charCodeAt(i)-17;
      var str=String.fromCharCode(num);
      try{
        if(parseInt(str)>=0){
          dec=dec.concat(str);
          //ct++;
        }
      }catch(err){}
    }
    return dec;
  }
  get_vl_bal(numadd,numsub){
    this.b_vl = this.b_vl+numadd;
    this.b_vl = this.b_vl-numsub;
    return this.b_vl
  }
  get_sl_bal(numadd,numsub){
    this.b_sl = this.b_sl+numadd;
    this.b_sl = this.b_sl-numsub;
    return this.b_sl
  }

  getEmployee (id) {
    this._leaveBalanceService.leave(id)
      .subscribe(
        data => {this.data = data.data},
        error => console.log("Error HTTP GET Service"),
        () => {this.getstmt(this.id,this.data[0]._from);},
      );

  }
  getstmt (id,date) {
    this._getstmtService.getStatement(id,date)
      .subscribe(
        data => {this.stmt = data},
        error => console.log("Error HTTP GET Service"),
        () => {console.log(this.stmt); this.tf=true;},
      );

  }

  ngOnInit() {
    this.enc = this.route.snapshot.params['id'];
    this.id = this.decrypt(this.enc);
    this.getEmployee(this.id);
    
  }
  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <style>
            p.head{
              text-align: center;
            }
            cntr{
              text-align: center;
            }
            img {
                float: left;
                margin: 0 -200px 10px 90px;
            }
            .right{
              text-align: right;
              font-size:	12px;
            }
            table {
              border-collapse: collapse;
              font-size:	12px;
            }
            table,th.s {
              border: 2px solid black;
            }
            td,th.ns{
              border: 1px solid black;
            }
          </style>
        </head>
        <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}

}
