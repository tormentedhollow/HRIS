import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  set:any;
  id:any;
  constructor(private router: Router) { }

  logout(){
      this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.set = JSON.parse(localStorage.getItem("set"));
    this.id = JSON.parse(localStorage.getItem("currentID"));
    if(this.set=="1"){
      this.set=true;
    }else{
      this.set=false;
    }
  }

}
