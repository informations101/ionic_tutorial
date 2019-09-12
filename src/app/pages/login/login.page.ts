import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';

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

  constructor(private auth: AuthService, private router: Router, private navCtrl: NavController,private location:Location) {

  }
  previousRoute: string;
  ngOnInit() {
    // this.previousRoute=this.location.back();
    // console.log(this.location.back())
  }
  backHome() {
    this.navCtrl.navigateBack('/');
  }

  signIn() {
    this.auth.signIn(this.user).subscribe(user => {
      let role = user['role'];
      if (role == 'USER') {
        this.location.back()
        // this.router.navigateByUrl(this.previousRoute);
      } else if (role == 'ADMIN') {
        this.location.back()
        // this.router.navigateByUrl(this.previousRoute);
      }
    });
  }
}