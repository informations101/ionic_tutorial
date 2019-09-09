import { Component, ViewChild } from '@angular/core';
import { Platform, ToastController, IonList } from '@ionic/angular';
import { StorageService, Item } from 'src/app/services/storage.service';

@Component({
  selector: 'app-crud-storage',
  templateUrl: './crud-storage.page.html',
  styleUrls: ['./crud-storage.page.scss'],
})
export class CrudStoragePage {

  items: Item[] = [];

  newItem: Item = <Item>{};
  @ViewChild('mylist', { static: false }) mylist: IonList;

  constructor(private storageService: StorageService, private plt: Platform, private toastController: ToastController) {
    this.plt.ready().then(() => {
      this.loadItems();
    });
  }

  // CREATE
  addItem() {
    this.newItem.modified = Date.now();
    this.newItem.id = Date.now();
    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
      this.showToast('Item added!')
      this.loadItems(); // Or add it to the array directly
    });
  }

  clearItem(item: Item) {
    if (!item.id) {
      this.showToast('no data to clear');
    } else {
      this.showToast('your data\'s clear');
      this.newItem = <Item>{};
    }
  }
  // READ
  loadItems() {
    this.storageService.getItems().then(items => {
      this.items = items;
    });
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