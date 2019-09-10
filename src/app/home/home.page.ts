import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private navCtrl: NavController) { }
  crudPage() {
    this.navCtrl.navigateForward('login');
    // this.navCtrl.navigateForward('crud-storage');
  }
  ngOnInit() {
  }
  
  loadingImage() {
    console.log('loading me');
  }

}
