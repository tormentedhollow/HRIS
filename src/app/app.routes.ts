import { Routes, RouterModule } from '@angular/router';
 
import { PdsComponent } from './pds/pds.component';
import { LeaveModuleComponent } from './leave-module/leave-module.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesComponent } from './employees/employees.component';
import { DetailComponent } from './employees/detail/detail.component';
import { UpdateEmployeeComponent } from './employees/update-employee/update-employee.component';
import { StatementOfLeaveCreditsComponent } from './leave-module/statement-of-leave-credits/statement-of-leave-credits.component';

import { AuthGuard } from './common/auth.guard';
 
const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard],
        children: [
            {
            path: 'pds',
            component: PdsComponent
            },{
            path: 'leave',
            component: LeaveModuleComponent
            },
            {
            path: 'dashboard',
            component: DashboardComponent
            },
            {
            path: 'employees',
            component: EmployeesComponent
            },
            {
            path: 'details/:id',
            component: DetailComponent
            },
            {
            path: 'update/:id',
            component: UpdateEmployeeComponent
            },{
            path: 'statement/:id',
            component: StatementOfLeaveCreditsComponent
            },
        ] },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: 'login' }
];
 
export const routing = RouterModule.forRoot(appRoutes);