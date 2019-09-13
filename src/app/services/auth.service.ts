import { async } from 'q';
import { CrudUserService } from 'src/app/services/crud-user.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { AlertController } from '@ionic/angular';

const USERS_KEY = 'user_key'
const TOKEN_KEY = 'user-access-token';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any>;
  private authState = new BehaviorSubject(null);

  constructor(private userService: CrudUserService, private router: Router, private storage: Storage, private alertCtrl: AlertController) {
    this.loadUser();

    // Filter out null values which is first behaviour Subject value

    this.user = this.authState
      .asObservable()
      .pipe(filter(response => response));
  }

  loadUser() {
    // Normally load e.g. JWT at this point
    this.storage.get(TOKEN_KEY).then(data => {
      if (data) {
        this.authState.next(data);
      } else {
        this.authState.next({ username: null, role: null });
      }
    });
  }

  async signIn(credentials) {
    let username = credentials.username;
    let pw = credentials.pw;
    let user = null;
    await this.userService.getUserByCredential(credentials.username, credentials.pw).then(async data => {
      if (data.length) {
        if (data[0].role == "ADMIN") {
          user = { username, pw, role: 'ADMIN' };
        } else if (data[0].role == "USESR") {
          user = { username, pw, role: 'USER' };
        }
      } else if (username === 'admin' && pw === 'admin') {
        user = { username, pw, role: 'ADMIN' };
      } else {
        this.showAlert();
      }
    })

    // if (email === 'admin' && pw === 'admin') {
    //   user = { email, pw, role: 'ADMIN' };
    // } else if (email === 'user' && pw === 'user') {
    //   user = { email, pw, role: 'USER' };
    // } else {
    //   this.showAlert();
    // }

    this.authState.next(user);

    // Normally you would store e.g. JWT
    this.storage.set(TOKEN_KEY, user);

    // Normally you would have a real user object at this point
    return of(user);
  }

  async signOut() {
    await this.storage.set(TOKEN_KEY, null);
    this.authState.next(null);
    this.router.navigateByUrl('/login');
  }
  async showAlert() {
    let alert = await this.alertCtrl.create({
      header: 'Warning Infomation',
      message: 'Please check your information again!',
      buttons: ['OK']
    });
    alert.present();
  }
}