import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [ EmployeeService ]
})
export class EmployeesComponent implements OnInit {

  Employees: Array<any>;
  stringFilter: string = '';
  objectsWithGettersFilter: any = { Sname: null };
  closeResult: string;
  staticAlertClosed = false;

  constructor(private _employeeService: EmployeeService, private router: Router, private modalService: NgbModal) { }

  close(){
  
  }

  getEmployee () {
    this._employeeService.getEmployee()
      .subscribe(
        data => this.Employees = data.data,
        error => console.log("Error HTTP GET Service"),
        () => console.log(this.Employees),
      );
  }

  viewEmployee (item){
    console.log(item);
    let id = item.PI_ID;
    this.router.navigate(['/home', 'details', id]); 
  }

  updateEmployee (item){
    console.log(item);
    let id = item.PI_ID;
    this.router.navigate(['/home', 'update', id]); 
  }

  open(item) {
    const modalRef = this.modalService.open(ModalContent);
    modalRef.componentInstance.id = item.PI_ID;
  }

  refresh(){
    this.getEmployee();
  }

  ngOnInit() {
    this.getEmployee();
    setTimeout(() => this.staticAlertClosed = true, 5000); //5 seconds  
  }

}

@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Upload Photo</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <input type="file" ng2FileSelect [uploader]="uploader"/>
       <button *ngFor="let item of uploader.queue"
       type="button" class="btn btn-success btn-s"
        (click)="item.upload()">{{ item?.file?.name }}
        <span class="glyphicon glyphicon-upload"></span> Upload
      </button>
      <div>
        Uplaod progress:
        <div class="progress" >
            <div class="progress-bar" role="progressbar" [ngStyle]="{ 'width': uploader.progress + '%' }"></div>
        </div>
        <div *ngIf="uploader.progress===100">
        <ngb-alert  type="success" >Upload successfully done! Please close the modal and refresh the list</ngb-alert>
        </div>
    </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class ModalContent implements OnInit{
  @Input() id;
  constructor(public activeModal: NgbActiveModal) {}

  uploader:FileUploader;
  ngOnInit() {
      console.log(this.id);
      this.uploader = new FileUploader({url: 'http://localhost:3000/upload?id='+this.id});
  }

}

