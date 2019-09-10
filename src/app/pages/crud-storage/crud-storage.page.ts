import { Component, ViewChild, OnInit } from '@angular/core';
import { Platform, ToastController, IonList, LoadingController } from '@ionic/angular';
import { StorageService, Item } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-crud-storage',
  templateUrl: './crud-storage.page.html',
  styleUrls: ['./crud-storage.page.scss'],
})
export class CrudStoragePage implements OnInit {

  items: Item[] = [];

  newItem: Item = <Item>{};
  @ViewChild('mylist', { static: false }) mylist: IonList;

  constructor(private loadCtrl: LoadingController, private auth: AuthService, private storageService: StorageService, private plt: Platform, private toastController: ToastController) {
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }
  data: any;
  ngOnInit() {
    // const loading = await this.loadCtrl.create({
    //   message: 'Loading data ...',
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

  // CREATE
  addItem() {
    if (this.newItem.id) {
      this.showToast('this is not a new item.')
    } else {
      this.newItem.modified = Date.now();
      this.newItem.id = Date.now();
      this.storageService.addItem(this.newItem).then(item => {
        this.newItem = <Item>{};
        this.showToast('Item added!')
        this.loadItems(); // Or add it to the array directly
      });
    }

  }

  clearItem(item: Item) {
    if (!item.id) {
      this.showToast('no data to clear');
      this.newItem = <Item>{};
    } else {
      this.showToast('your data\'s clear');
      this.newItem = <Item>{};
    }
  }
  // READ
  async loadItems() {
    const loading = await this.loadCtrl.create({
      message: 'Loading data ...',
    });
    await loading.present();

    this.storageService.getItems().then(items => {
      this.items = items;
    });
    this.data = '1';
    await loading.dismiss();
  }

  // READ ONE ITEM

  readOneItem(item: Item) {

    this.newItem.id = item.id;
    this.newItem.name = item.name;
    this.newItem.code = item.code;
    this.newItem.struture = item.struture;
    this.newItem.modified = Date.now();
  }
  // UPDATE ONE
  updateOneItem(item: Item) {
    if (!item.id) {
      this.showToast('no data update');
    } else {
      item.modified = Date.now();
      this.storageService.updateItem(item).then(item => {
        this.newItem = <Item>{};
        this.showToast('Item updated!');
        this.loadItems(); // Or update it inside the array directly
      });
    }

  }
  // UPDATE
  updateItem(item: Item) {

    item.name = `UPDATED: ${item.name}`;
    item.modified = Date.now();

    this.storageService.updateItem(item).then(item => {
      this.showToast('Item updated!');
      this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
      this.loadItems(); // Or update it inside the array directly
    });
  }

  // DELETE
  deleteItem(item: Item) {
    if (!item.id) {
      this.newItem = <Item>{};
      this.showToast('no data to remove');
    } else {
      this.storageService.deleteItem(item.id).then(item => {
        this.newItem = <Item>{};
        this.showToast('Item removed!');
        this.mylist.closeSlidingItems(); // Fix or sliding is stuck afterwards
        this.loadItems(); // Or splice it from the array directly
      });
    }

  }

  // Helper
  async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}