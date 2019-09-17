import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PreloadingImageComponent } from './preloading-image/preloading-image.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  declarations: [
    PreloadingImageComponent,
    LoginComponent
  ],
  exports: [
    PreloadingImageComponent,
    LoginComponent
  ],
  entryComponents: [],
})
export class ComponentsModule {}
