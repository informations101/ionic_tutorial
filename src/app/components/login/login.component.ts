import { Location } from '@angular/common';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user = {
    username: '',
    pw: ''
  };
  _username = ''
  _password = ''
  constructor(
    private router: Router,
    private auth: AuthService,
    private location: Location
  ) { }
  @Input() set name(val: string) {
    this._username = (val !== undefined && val !== null) ? val : '';
  }
  @Input() set password(val: string) {
    this._password = (val !== undefined && val !== null) ? val : '';
  }
  ngOnInit() { }
  async signIn() {
    (await this.auth.signIn(this.user)).subscribe(user => {
      let role = user['role'];
      if (role == 'ADMIN') {
        this.router.navigateByUrl('crud-user');
      } else if (role == 'USER') {
        this.router.navigateByUrl('user-dashboard');
      }
    });
  }
  backHome() {
    this.router.navigateByUrl('/');
  }
}
