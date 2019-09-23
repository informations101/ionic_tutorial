import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { ProgressBarModule } from "angular-progress-bar"
import { IonicModule } from '@ionic/angular';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { LoadingScreenPage } from './loading-screen.page';

const routes: Routes = [
  {
    path: '',
    component: LoadingScreenPage
  }
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, RoundProgressModule,
    RouterModule.forChild(routes),
    ProgressBarModule,
    NgCircleProgressModule.forRoot({
      backgroundStrokeWidth: 0,
      backgroundPadding: 7,
      space: -3,
      toFixed: 0,
      outerStrokeWidth: 7,
      outerStrokeColor: '#808080',
      innerStrokeWidth: 4,
      innerStrokeColor: '#e7e8ea',
      animationDuration: 100,
      animation: true,
      startFromZero: false,
      responsive: true,
      showUnits: true,
      showTitle: true,
      titleColor: 'white',
      showSubtitle: false,
      showImage: false,
      renderOnClick: false
    })
  ],
  declarations: [LoadingScreenPage]
})
export class LoadingScreenPageModule { }
