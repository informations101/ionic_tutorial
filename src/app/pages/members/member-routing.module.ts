import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule'
  },
  {
    path: 'crud-storage', loadChildren: '../crud-storage/crud-storage.module#CrudStoragePageModule'
  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
