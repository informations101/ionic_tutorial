import { Location } from '@angular/common';
import { LanguageService } from './../../services/language.service';
import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-multi-language',
  templateUrl: './multi-language.component.html',
  styleUrls: ['./multi-language.component.scss'],
})
export class MultiLanguageComponent implements OnInit {
  languages = [];
  selected = '';
  constructor(
    // private navController: NavController,
    private languageService: LanguageService,
    private modalController: ModalController
    // private location: Location
  ) { }
  ngOnInit() {
    this.languages = this.languageService.getLanguages();
    this.selected = this.languageService.selected;
  }
  select(lng) {
    this.languageService.setLanguage(lng);
    this.selected = this.languageService.selected;
    this.languages = this.languageService.getLanguages();
    this.modalController.dismiss()
    // this.navController.setDirection("back", true, "back");
    // this.location.back();
  }
}
