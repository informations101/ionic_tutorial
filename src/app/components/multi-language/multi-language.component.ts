import { LanguageService } from './../../services/language.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multi-language',
  templateUrl: './multi-language.component.html',
  styleUrls: ['./multi-language.component.scss'],
})
export class MultiLanguageComponent implements OnInit {
  languages = [];
  selected = '';
  constructor(
    private languageService: LanguageService,
  ) { }
  ngOnInit() {
    this.languages = this.languageService.getLanguages();
    this.selected = this.languageService.selected;
  }
  select(lng) {
    this.languageService.setLanguage(lng);
    this.selected = this.languageService.selected;
    this.languages = this.languageService.getLanguages();
  }
}
