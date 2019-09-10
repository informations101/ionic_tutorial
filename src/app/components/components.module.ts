import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PreloadingImageComponent } from './preloading-image/preloading-image.component';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
  ],
  declarations: [
    PreloadingImageComponent
  ],
  exports: [
    PreloadingImageComponent
  ],
  entryComponents: [],
})
export class ComponentsModule {}
