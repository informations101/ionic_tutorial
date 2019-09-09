import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService, Item } from 'src/app/services/storage.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.page.html',
  styleUrls: ['./user-dashboard.page.scss'],
})
export class UserDashboardPage implements OnInit {
  items: Item[] = [];
  constructor(private auth:AuthService,private storageService:StorageService) { }

  ngOnInit() {
    this.loadItems();
  }
  signOut() {
    this.auth.signOut();
  }
  loadItems() {
    this.storageService.getItems().then(items => {
      this.items = items;
    });
  }
}
