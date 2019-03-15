import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PdsService } from '../../services/pds.service';

class Voluntary {
    name: string ='';
    from: string ='';
    to: string ='';
    hours: string ='';
    position: string ='';   
}

class Training {
    title: string ='';
    from: string ='';
    to: string ='';
    hours: string ='';
    conducted: string ='';   
}


@Component({
  selector: 'app-pds3',
  templateUrl: './pds3.component.html',
  styleUrls: ['./pds3.component.css'],
  providers: [PdsService]
})
export class Pds3Component implements OnInit {

  @Output() onProceed4 = new EventEmitter<void>();
  @Input('id') lastId: string;

  newVol: Voluntary;
  newTrain: Training;
  voluntaries: Array<any> = [];
  trainings: Array<any> = [];
  skill: string;
  NA: string;
  mem: string;
  skills: Array<any> = [];
  nonacademic: Array<any> = [];
  membership: Array<any> = [];
  result: any;

  addVol(){
    if( this.newVol ){
      this.voluntaries.push(this.newVol);
      this.newVol = new Voluntary();     
    }
  }

  removeVol(index){
    this.voluntaries.splice(index, 1);
  }

   addTrain(){
    if( this.newTrain ){
      this.trainings.push(this.newTrain);
      this.newTrain = new Training();     
    }
  }

  removeTrain(index){
    this.trainings.splice(index, 1);
  }

  addSkills(){
    this.skills.push(this.skill);
    this.skill = null;
  }

  removeSkills(index){
    this.skills.splice(index, 1);
  }

  addNA(){
    this.nonacademic.push(this.NA);
    this.NA = null;
  }

  removeNA(index){
    this.nonacademic.splice(index, 1);
  }

  addMembership(){
    this.membership.push(this.mem);
    this.mem = null;
  }

  removeMembership(index){
    this.membership.splice(index, 1);
  }

   onSubmit() {
    console.log(this.voluntaries); 
    console.log(this.trainings);
    console.log(this.skills);
    console.log(this.nonacademic);
    console.log(this.membership);
    this.pdsService.addPDS3(this.lastId, this.voluntaries, this.trainings, this.skills, this.nonacademic, this.membership)
      .subscribe( 
        data => this.result = data.data,
        error => console.log("Error HTTP GET Service"),
        () =>  this.onProceed4.emit(), //pass an event to parent
      );

  }

  constructor(private pdsService: PdsService) {
    this.newVol = new Voluntary();
    this.newTrain = new Training();
   }

  ngOnInit() {
    console.log(this.lastId);
  }

}
