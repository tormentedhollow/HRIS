import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PdsService } from '../../services/pds.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

class Child {
    name: string;
    bday2: string;
}

class Education {
    level: string = "";
    school: string = "";
    course: string = "";
    yg: string = "";
    hg: string = "";
    from: string = "";
    to: string = "";
    scholarship: string = "";
}


@Component({
  selector: 'app-pds1',
  templateUrl: './pds1.component.html',
  styleUrls: ['./pds1.component.css'],
  providers: [ PdsService ]
})
export class Pds1Component implements OnInit {

  @Output() onProceed2 = new EventEmitter<void>();

  newChild: Child;
  newEduc: Education;
  children: Array<any> = [];
  educations: Array<any> = [];
  result: any;
  content: any;


  addChild(){
    if( this.newChild ){
      this.children.push(this.newChild);
      this.newChild = new Child();     
    }
  }

  removeChild(index){
    this.children.splice(index, 1);
  }

  addEducation(){
    console.log(this.newEduc);
    if( this.newEduc ){
      this.educations.push(this.newEduc);
      this.newEduc = new Education();     
    }
  }

  removeEducation(index){
    this.educations.splice(index, 1);
  }

  onSubmit(f: NgForm) {
    console.log(f.value); 
    console.log(this.children);
    console.log(this.educations);

    this.pdsService.addPDS1(f.value, this.children, this.educations)
      .subscribe(
        data => this.result = data.data.insertId,
        error => console.log("Error HTTP GET Service"),
        () =>  this.onProceed2.emit(this.result), //pass an event to parent
      );
     //this.modalService.open(this.content)
  }

  constructor(private pdsService: PdsService, private modalService: NgbModal) {
    this.newChild = new Child();
    this.newEduc = new Education();
   }

  ngOnInit() {
  }

}
