import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-pds',
  templateUrl: './pds.component.html',
  styleUrls: ['./pds.component.css']
})
export class PdsComponent implements OnInit {

  disable_page1: boolean;
  disable_page2: boolean;
  disable_page3: boolean;
  disable_page4: boolean;
  id: string;

   @ViewChild('t') t;

  disable1(id: string){
    this.disable_page1 = true;
    this.disable_page2 = false;
    this.disable_page3 = true;
    this.disable_page4 = true;
    window.scrollTo(0, 0);
    this.t.activeId='page2';
    this.id = id; // get the lastId

  }

  disable2(){
    this.disable_page1 = true;
    this.disable_page2 = true;
    this.disable_page3 = false;
    this.disable_page4 = true;
    window.scrollTo(0, 0);
    this.t.activeId='page3';
  }

  disable3(){
    this.disable_page1 = true;
    this.disable_page2 = true;
    this.disable_page3 = true;
    this.disable_page4 = true;
    window.scrollTo(0, 0);
    this.t.activeId='page4';
  }

  ngOnInit() {
    this.disable_page1 = false;
    this.disable_page2 = true;
    this.disable_page3 = true;
    this.disable_page4 = true;
  }

  constructor() {}

}
