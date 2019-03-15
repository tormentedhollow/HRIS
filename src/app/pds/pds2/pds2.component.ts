import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PdsService } from '../../services/pds.service';

class CSE {
    cs: string = '';
    rating: string = '';
    doe: string = '';
    poe: string = '';
    ln: string = '';
    dor: string = '';
}

class WorkExperience {
    from: string = '';
    to: string = '';
    position: string = '';
    office: string = '';
    salary: string = '';
    sg: string = '';
    status: string = '';
    gs: string = '';
}

@Component({
  selector: 'app-pds2',
  templateUrl: './pds2.component.html',
  styleUrls: ['./pds2.component.css'],
  providers: [PdsService],
})
export class Pds2Component implements OnInit {

  @Output() onProceed3 = new EventEmitter<void>();
  @Input('id') lastId: string;
  result: any;
 
  newCSE: CSE;
  newWE: WorkExperience;

  CSEs: Array<any> = [];
  WEs: Array<any> = [];

  addCSE(){
    if( this.newCSE ){
      this.CSEs.push(this.newCSE);
      this.newCSE = new CSE();     
    }
  }

  removeCSE(index){
    this.CSEs.splice(index, 1);
  }

  addWE(){
    if( this.newWE ){
      this.WEs.push(this.newWE);
      this.newWE = new WorkExperience();     
    }
  }

  removeWE(index){
    this.WEs.splice(index, 1);
  }

  onSubmit() {
    console.log(this.CSEs); 
    console.log(this.WEs);

    this.pdsService.addPDS2(this.lastId, this.CSEs, this.WEs)
      .subscribe(
        data => this.result = data.data,
        error => console.log("Error HTTP GET Service"),
        () =>  this.onProceed3.emit(), //pass an event to parent
      );

  }

  constructor(private pdsService: PdsService) { 
    this.newCSE = new CSE();
    this.newWE = new WorkExperience();
  }

  ngOnInit() {
      console.log(this.lastId);
  }

}
