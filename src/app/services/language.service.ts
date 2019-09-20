import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selected = '';

  constructor(private translate: TranslateService, private storage: Storage, private plt: Platform) { }

  setInitialAppLanguage() {
    let language = this.translate.getBrowserLang();
    this.translate.setDefaultLang(language);

    this.storage.get(LNG_KEY).then(val => {
      if (val) {
        this.setLanguage(val);
        this.selected = val;
      }
    });
  }

  getLanguages() {
    if (this.selected == "en") {
      return [
        { text: 'English', value: 'en', img: 'assets/img/en.png' },
        { text: 'Khmer', value: 'kh', img: 'assets/img/kh.png' },
      ];
    } else {
      return [
        { text: 'ភាសាអង់គ្លេស', value: 'en', img: 'assets/img/en.png' },
        { text: 'ភាសាខ្មែរ', value: 'kh', img: 'assets/img/kh.png' },
      ];
    }
  }

  setLanguage(lng) {
    this.selected = lng;
    this.translate.use(lng);
    this.storage.set(LNG_KEY, lng);
  }
}