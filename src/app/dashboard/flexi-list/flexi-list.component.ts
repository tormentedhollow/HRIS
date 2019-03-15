import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-flexi-list',
  templateUrl: './flexi-list.component.html',
  styleUrls: ['./flexi-list.component.css']
})
export class FlexiListComponent implements OnInit {
  closeResult: string;
  constructor( private modalService: NgbModal) { }

  open(content) {
    this.modalService.open(content,{size:"lg"}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {    });
  }


  ngOnInit() {
    this.closeResult = "ng init executed";
  }

}
