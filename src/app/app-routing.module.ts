
// { path: '', redirectTo: 'home', pathMatch: 'full' },
// { path: 'home', loadChildren: './home/home.module#HomePageModule' },
// { path: 'crud-storage', loadChildren: './pages/crud-storage/crud-storage.module#CrudStoragePageModule' },

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'crud-storage', loadChildren: './pages/crud-storage/crud-storage.module#CrudStoragePageModule' },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: 'admin-dashboard',
    loadChildren: './pages/admin-dashboard/admin-dashboard.module#AdminDashboardPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN'
    }
  },
  {
    path: 'user-dashboard',
    loadChildren: './pages/user-dashboard/user-dashboard.module#UserDashboardPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'USER'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }