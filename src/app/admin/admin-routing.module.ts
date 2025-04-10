import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { adminGuardGuard } from './admin-guard.guard';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { FelhasznalokComponent } from './felhasznalok/felhasznalok.component';

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [adminGuardGuard], 
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: FelhasznalokComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
