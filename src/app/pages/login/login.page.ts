import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  user = {
    email: '',
    pw: ''
  };

  constructor(private auth: AuthService, private router: Router, private navCtrl: NavController) {
  }

  ngOnInit() {
  }
  backHome() {
    console.log('backhome')
    this.navCtrl.navigateBack('/');
  }

  signIn() {
    this.auth.signIn(this.user).subscribe(user => {
      let role = user['role'];
      if (role == 'USER') {
        this.router.navigateByUrl('/user-dashboard');
      } else if (role == 'ADMIN') {
        this.router.navigateByUrl('/crud-storage');
      }
    });
  }
}