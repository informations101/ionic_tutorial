import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { PreloadingImageComponent } from '../components/preloading-image/preloading-image.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  constructor(private navCtrl: NavController, private loadCtrl: LoadingController) {

  }
  crudPage() {
    this.navCtrl.navigateForward('login');
    // this.navCtrl.navigateForward('crud-storage');
  }
  ngOnInit() {

  }

  async loadingImage() { 
    const loading = await this.loadCtrl.create({
      message: 'Loading data ...',
      spinner:'crescent',
    });
    await loading.present();
    await loading.dismiss();
  }

} 