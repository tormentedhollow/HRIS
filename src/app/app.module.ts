import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { PdsComponent } from './pds/pds.component';
import { LoginComponent } from './login/login.component';
import { Pds1Component } from './pds/pds1/pds1.component';
import { Pds2Component } from './pds/pds2/pds2.component';
import { Pds3Component } from './pds/pds3/pds3.component';
import { Pds4Component } from './pds/pds4/pds4.component';

import { AuthGuard } from './common/auth.guard';
import { RouterModule } from '@angular/router';
import { routing }        from './app.routes';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { EmployeesComponent,  ModalContent} from './employees/employees.component';
import { DataTableModule } from "angular2-datatable";
import { MomentModule } from 'angular2-moment';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { DetailComponent } from './employees/detail/detail.component';
import { FileUploadModule } from "ng2-file-upload";
import { UpdateEmployeeComponent } from './employees/update-employee/update-employee.component';
import { LeaveModuleComponent, ModalContentLeave } from './leave-module/leave-module.component';
import { StatementOfLeaveCreditsComponent } from './leave-module/statement-of-leave-credits/statement-of-leave-credits.component';
import { LbPipe } from './pipe/lb.pipe';
import { LbDeductionPipe } from './pipe/lb-deduction.pipe';
import { FlexiListComponent } from './dashboard/flexi-list/flexi-list.component';
@NgModule({
  declarations: [
    AppComponent,
    PdsComponent,
    LoginComponent,
    Pds1Component,
    Pds2Component,
    Pds3Component,
    Pds4Component,
    HomeComponent,
    DashboardComponent,
    EmployeesComponent,
    DetailComponent,
    ModalContent,
    ModalContentLeave,
    UpdateEmployeeComponent,
    LeaveModuleComponent,
    StatementOfLeaveCreditsComponent,
    StatementOfLeaveCreditsComponent,
    LbPipe,
    LbDeductionPipe,
    FlexiListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule, 
    routing,
    NgbModule.forRoot(),
    ChartsModule,
    DataTableModule,
    MomentModule,
    Ng2FilterPipeModule,
    FileUploadModule
  ],
  providers: [
    AuthGuard
  ],
  entryComponents: [
    ModalContent,
    ModalContentLeave
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
