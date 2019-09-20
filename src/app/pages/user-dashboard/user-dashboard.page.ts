import { User, CrudUserService } from 'src/app/services/crud-user.service';
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
  users: User[] = [];
  constructor(private auth: AuthService, private storageService: StorageService, private loadCtrl: LoadingController, private crudUserService: CrudUserService) {
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
      this.items = sortByKey(items, 'modified');
    });
    this.crudUserService.getUser().then(users => {
      this.users = sortByKey(users, 'modified');
    })
    this._data = '1';
    await loading.dismiss();
  }
}
// SORT OBJECT ARRAY BY KEY
function sortByKey(array, key: string) {
  return array.sort(function (a: { [x: string]: any; }, b: { [x: string]: any; }) {
    var x = a[key];
    var y = b[key];
    return ((x > y) ? -1 : ((x > y) ? 1 : 0));
  });
}