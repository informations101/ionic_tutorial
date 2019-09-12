import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { PreloadingImageComponent } from '../components/preloading-image/preloading-image.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  constructor(private navCtrl: NavController, private loadCtrl: LoadingController,private route:Router,private auth:AuthService) {

  }
  crudUser() {
    console.log(1111111);
    
    // this.navCtrl.navigateForward('login');
    // this.navCtrl.navigateForward('crud-user');
    // if(this.auth.loadUser){
      
    //   console.log('user')
      this.route.navigateByUrl('crud-user')
    // }else{
    //   this.navCtrl.navigateForward('login');
    // }
  }
  crudPage() {
    if(this.auth.loadUser){
      console.log('user')
      this.route.navigateByUrl('crud-storage')
    }else{
      this.navCtrl.navigateForward('login');
    }
    // this.navCtrl.navigateForward('login');
    // this.navCtrl.navigateForward('crud-storage');
  }
  ngOnInit() {

  }

  async signOut() { 
    const loading = await this.loadCtrl.create({
      message: 'Singing out ...',
      spinner:'crescent',
    });
    await loading.present();
    this.auth.signOut();
    await loading.dismiss();
  }

} 