import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { EmployeeService } from '../../services/employee.service';

class Employee {
    Sname: string;
    Fname: string;
    Mname: string;
    Extname: string;
    DoB: string;
    PoB: string;
    sex: string;
    civil_status: string;
    citizenship: string;
    Height: string;
    Weight: string;
    BT: string;
    GSIS_ID: string;
    PAGIBIG_ID: string;
    PHILHEALTH_ID: string;
    SSS_ID: string;
    R_Address: string;
    R_ZipCode: string;
    R_Tel: string;
    P_Address: string;
    P_ZipCode: string;
    P_Tel: string;
    Email: string;
    Cell: string;
    A_Emp_ID: string;
    TIN: string;
    Photo: string;
    s_surname: string;
    s_firstname: string; 
    s_middlename: string; 
    s_occupation: string; 
    s_employer: string;
    s_tel: string;
    f_surname:string; 
    f_firstname:string; 
    f_middlename:string;
    m_surname:string; 
    m_firstname:string; 
    m_middlename: string;
}

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
  providers: [ EmployeeService ]
})
export class UpdateEmployeeComponent implements OnInit {

  Employees: Employee;
  Child: Array<any>;
  Education: Array<any>;
  CSE: Array<any>;
  WE: Array<any>;
  VWI: Array<any>;
  TP: Array<any>;
  Skills: Array<any>;
  NA: Array<any>;
  Membership: Array<any>;
  result: Array<any>;
  id: number;
  submitted = false;
  selectedChild = this.Child;
  selectedEducation = this.Education;
  selectedCSE = this.CSE;
  selectedWE = this.WE;
  selectedVW = this.VWI;
  selectedTP = this.TP;
  selectedSkills = this.Skills;
  selectedNA = this.NA;
  selectedMem = this.Membership;

  extensions = ['Jr.', 'Sr.', 'III', 'IV'];
  sexx = ['Male', 'Female'];
  civilStatus = ['Single', 'Married', 'Annulled', 'Widow', 'Separated', 'Others'];
  citizenships = ['Filipino', 'Others'];
  levels = ['Elementary', 'Secondary', 'Vocational / Trade Course', 'College', 'Graduate Studies'];
  questions = ['Yes', 'No'];
  statuss = ['Contractual', 'Permanent', 'Temporary', 'Job Order'];

  constructor(private router: Router, private route: ActivatedRoute, private location: Location, private _employeeService: EmployeeService) { }

  updateChild(c){
    this.selectedChild = c;
  }

  addChild(name, bday){
    this.Child.push({name: name, DoB: bday});
  }

  removeChild(index){
    this.Child.splice(index, 1);
    this.selectedChild = null;
  }
  addEducation(a,b,c,d,e,f,g,h){
    this.Education.push({Level: a, School_Name: b, Degree: c, Year_Grad: d, Highest_GLUE: e, SAHR: f, IDA_From: g, IDA_To: h});
  }
  removeEducation(index){
    this.Education.splice(index, 1);
    this.selectedEducation = null;
  }
  updateEducation(e){
    this.selectedEducation = e;
  }

  removeCSE(index){
    this.CSE.splice(index, 1);
    this.selectedCSE = null;
  }

  addCSE(a,b,c,d,e,f){
    this.CSE.push({CS:a, Rating:b, DoEC:c, poEC:d, License_Num:e, License_DoR:f})
  }
  updateCSE(c){
    this.selectedCSE= c;
  }

  addWE(a,b,c,d,e,f, g, h){
    this.WE.push({_from:a, _to:b, position:c, office:d, salary:e, sg:f, status:g, gov_service:h})
  }
  updateWE(w){
    this.selectedWE= w;
  }
  removeWE(index){
    this.WE.splice(index, 1);
    this.selectedWE = null;
  }

  addVWI(a,b,c,d,e){
    this.VWI.push({Org_Name:a, IDA_From:b, IDA_To:c, Hours:d, PosNoW:e})
  }
  updateVWI(w){
    this.selectedVW= w;
  }
  removeVWI(index){
    this.VWI.splice(index, 1);
    this.selectedVW = null;
  }
  addTP(a,b,c,d,e){
    this.TP.push({Title:a, IDA_From:b, IDA_To:c, Hours:d, Conducted_By:e})
  }
  removeTP(index){
    this.TP.splice(index, 1);
    this.selectedTP = null;
  }
  updateTP(t){
    this.selectedTP= t;
  }




  addSkills(name){
    this.Skills.push({sp_name: name});
  }
  removeSkills(index){
    this.Skills.splice(index, 1);
  }
  addNA(name){
    this.NA.push({na_name: name});
  }

  removeNA(index){
    this.NA.splice(index, 1);
  }

  addMembership(name){
    this.Membership.push({m_name: name});
  }
  removeMembership(index){
    this.Membership.splice(index, 1);
  }


 getEmpDetails (id) {
    this._employeeService.getEmployeeDetails(id)
      .subscribe(
        data => {
          this.Employees = data.data[0];
          this.Child = data.child;
          this.Education = data.education;
          this.CSE = data.cse;
          this.WE = data.we;
          this.VWI = data.vwi;
          this.TP = data.tp;
          this.Skills = data.skills;
          this.NA = data.na;
          this.Membership = data.mem;
        },
        error => console.log("Error HTTP GET Service"),
        () => console.log(this.VWI),
      );
  }

   onSubmit() {
    // console.log(this.Employees);
    // console.log(this.Child);
    console.log(this.Membership);
     this._employeeService.updateEmployee(this.Employees, this.Child, this.Education, this.CSE, this.WE,
     this.VWI, this.TP, this.Skills, this.NA, this.Membership)
      .subscribe(
        data => this.result = data.data,
        error => console.log("Error HTTP GET Service"),
        () => {
          if(this.result){
            if(JSON.parse(localStorage.getItem("set"))==1)
              this.router.navigate(['/home', 'employees']);
            else
              this.router.navigate(['/home', 'details',JSON.parse(localStorage.getItem("currentID"))]);
          }
        },
      );
    
  }

  ngOnInit() {
    this.Employees = new Employee();
    this.route.params.subscribe(params => {
       this.id = +params['id']; 
    });
    this.getEmpDetails(this.id);

  }

}
