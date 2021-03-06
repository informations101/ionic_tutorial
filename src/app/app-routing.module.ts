
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'loading-screen', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  {
    path: 'admin-dashboard',
    loadChildren: './pages/admin-dashboard/admin-dashboard.module#AdminDashboardPageModule',
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  {
    path: 'crud-storage',
    loadChildren: './pages/crud-storage/crud-storage.module#CrudStoragePageModule',
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
  },
  {
    path: 'crud-user', loadChildren: './pages/crud-user/crud-user.module#CrudUserPageModule',
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN'
    }
  },
  { path: 'home-desgin', loadChildren: './pages/home-desgin/home-desgin.module#HomeDesginPageModule' },
  { path: 'loading-screen', loadChildren: './pages/loading-screen/loading-screen.module#LoadingScreenPageModule' }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }