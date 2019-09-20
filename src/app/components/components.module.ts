import { TranslateModule } from '@ngx-translate/core';
import { MultiLanguageComponent } from './multi-language/multi-language.component';
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
    TranslateModule
  ],
  declarations: [
    PreloadingImageComponent,
    LoginComponent,
    MultiLanguageComponent
  ],
  exports: [
    PreloadingImageComponent,
    LoginComponent,
    MultiLanguageComponent
  ],
  entryComponents: [],
})
export class ComponentsModule { }
