import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PdsService } from '../../services/pds.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pds4',
  templateUrl: './pds4.component.html',
  styleUrls: ['./pds4.component.css'],
  providers: [PdsService]
})
export class Pds4Component implements OnInit {

  question: Array<any> = [];
  @Input('id') lastId: string;
  result: any;
  hide = true;

 onSubmit(f: NgForm) {
    console.log(f.value);
    f.value.PI_ID = this.lastId;
    this.pdsService.addPDS4(f.value)
      .subscribe( 
        data => this.result = data.data,
        error => console.log("Error HTTP GET Service"),
        () =>  this.router.navigate(['/home', 'employees']) , 
      ); 

  }

  constructor(private pdsService: PdsService, private router: Router,) { }

  ngOnInit() {
    console.log(this.lastId);
  }

}
