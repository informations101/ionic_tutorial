import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'crud-storage', loadChildren: './pages/crud-storage/crud-storage.module#CrudStoragePageModule' },
  { path: 'login', loadChildren: './pages/public/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/public/register/register.module#RegisterPageModule' },
  // { path: 'dashboard', loadChildren: './pages/members/dashboard/dashboard.module#DashboardPageModule' },
  {
    path: 'members',
    canActivate: [AuthGuard],
    loadChildren: './pages/members/member-routing.module#MemberRoutingModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }