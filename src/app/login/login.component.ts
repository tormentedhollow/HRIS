import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
  user: any;
  staticAlertClosed = true;
  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.logout();
  }

  login(username, password){  
    
    this.authenticationService.login(username, password)
      .subscribe(
        data => this.user = data,
        error => console.log("Error HTTP GET Service"),
        () => {
          console.log(this.user.data[0]);
          if(this.user.data[0].User_id!=undefined){
            localStorage.setItem('currentUser', JSON.stringify(this.user.data[0].Uname));
            localStorage.setItem('set', JSON.stringify("1"));
            this.router.navigate(['/home', 'dashboard']);
          }else if(this.user.data[0].PI_ID!=undefined){
            localStorage.setItem('currentUser', JSON.stringify(this.user.data[0].Sname));
            localStorage.setItem('currentID', JSON.stringify(this.user.data[0].PI_ID));
            localStorage.setItem('set', JSON.stringify("0"));
            this.router.navigate(['/home', 'update',this.user.data[0].PI_ID]);
          }else{
            this.staticAlertClosed = false;
            setTimeout(() => this.staticAlertClosed = true, 5000); //5 seconds
          }
        }
      );
  }

}
