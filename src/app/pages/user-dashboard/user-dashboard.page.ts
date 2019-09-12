import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService, Item } from 'src/app/services/storage.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
})
export class UserDashboardPage {
  items: Item[] = [];
  constructor(private auth: AuthService, private storageService: StorageService, private loadCtrl: LoadingController) {
    this.loadItems();
  }

  _data: any;
  ionViewWillEnter() {
    // const loading = await this.loadCtrl.create({
    //   message: 'Loading data ...',
    //   duration: 90000
    // });
    // await loading.present();
    // this.loadItems();
    // this.data = '1';
    // console.log(this.data)
    // await loading.dismiss();
  }
  signOut() {
    this.auth.signOut();
  }
  async loadItems() {
    const loading = await this.loadCtrl.create({
      message: 'Loading data ...',
      // duration: 90000
    });
    await loading.present();
    this.storageService.getItems().then(items => {
      this.items = items;
    });
    this._data = '1';
    await loading.dismiss();
  }
}
