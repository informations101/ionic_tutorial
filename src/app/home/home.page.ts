import { HomeDesginPage } from './../pages/home-desgin/home-desgin.page';
import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, ModalController } from '@ionic/angular';
import { PreloadingImageComponent } from '../components/preloading-image/preloading-image.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { myEnterAnimationModal } from '../animations/enter-modal';
import { myLeaveAnimationModal } from '../animations/leave-modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

  constructor(private navCtrl: NavController, private loadCtrl: LoadingController,
    private route: Router, private auth: AuthService,
    private modalCtrl: ModalController
  ) {

  }
  crudUser() {
    this.navCtrl.navigateForward('crud-user');
  }
  crudPage() {
    this.navCtrl.navigateForward('crud-storage');
  }
  dataDashboard() {
    this.navCtrl.navigateForward('user-dashboard');
  }
  ngOnInit() {
    // console.log('ngOnInit')
  }
  checkEvenScreen() {
    this.navCtrl.navigateForward('even-screen')
  }
  changeLanguage() {
    this.modalCtrl.create({
      component: HomeDesginPage,
      enterAnimation: myEnterAnimationModal,
      leaveAnimation: myLeaveAnimationModal
    }).then((modal) => {
      modal.present();
    });
    // this.navCtrl.navigateForward('home-desgin');
  }

  async signOut() {
    const loading = await this.loadCtrl.create({
      message: 'Singing out ...',
      spinner: 'crescent',
    });
    await loading.present();
    await this.auth.signOut();
    await loading.dismiss();
  }

} 