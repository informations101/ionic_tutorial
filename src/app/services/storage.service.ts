import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { promise } from 'protractor';

export interface Item {
  id: number,
  code: string,
  name: string,
  struture: string,
  modified: number
}

const ITEMS_KEY = 'icon-key';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  // CREATE
  async addItem(item: Item): Promise<any> {
    const items = await this.storage.get(ITEMS_KEY);
    if (items) {
      items.push(item);
      return this.storage.set(ITEMS_KEY, items);
    }
    else {
      return this.storage.set(ITEMS_KEY, [item]);
    }
  }

  // READ
  getItems(): Promise<Item[]> {
    return this.storage.get(ITEMS_KEY);
  }
  // READ ONE ITEM

  async readOneItem(item: Item):Promise<any> {
    if(item.id===0){
      return null;
    }else{
      // console.log(this.storage.get(ITEMS_KEY));
      console.log(item);
    }
  }

  // UPDATE
  async updateItem(item: Item): Promise<any> {
    const items = await this.storage.get(ITEMS_KEY);
    if (!items || items.length === 0) {
      return null;
    }
    let newItems: Item[] = [];
    for (let i of items) {
      if (i.id === item.id) {
        newItems.push(item);
      }
      else {
        newItems.push(i);
      }
    }
    return this.storage.set(ITEMS_KEY, newItems);
  }

  // DELETE
  async deleteItem(id: number): Promise<Item> {
    const items = await this.storage.get(ITEMS_KEY);
    if (!items || items.length === 0) {
      return null;
    }
    let toKeep: Item[] = [];
    for (let i of items) {
      if (i.id !== id) {
        toKeep.push(i);
      }
    }
    return this.storage.set(ITEMS_KEY, toKeep);
  }
}