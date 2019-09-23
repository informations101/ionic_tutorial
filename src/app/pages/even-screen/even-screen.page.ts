import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { myEnterAnimationModal } from 'src/app/animations/enter-modal';

@Component({
  selector: 'app-even-screen',
  templateUrl: './even-screen.page.html',
  styleUrls: ['./even-screen.page.scss'],
})
export class EvenScreenPage implements OnInit {

  constructor(
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    const toast = await this.toastController.create({
      message: 'ngOnInit',
      duration: 2000
    });
    toast.present();
    console.log('ngOnInit')
  }

  async ngOnDestroy(): Promise<void> {
    const toast = await this.toastController.create({
      message: 'ngOnDestroy',
      duration: 2000
    });
    toast.present();
    console.log('ngOnDestroy')
  }
  async ionViewWillEnter() {
    const toast = await this.toastController.create({
      message: 'ionViewWillEnter',
      duration: 2000
    });
    toast.present();
    console.log('ionViewWillEnter')
  }
  async ionViewDidEnter() {
    const toast = await this.toastController.create({
      message: 'ionViewDidEnter',
      duration: 2000
    });
    toast.present();
    console.log('ionViewDidEnter')
  }
  async ionViewWillLeave() {
    const toast = await this.toastController.create({
      message: 'ionViewWillLeave',
      duration: 2000
    });
    toast.present();
    console.log('ionViewWillLeave')
  }
  async ionViewDidLeave() {
    const toast = await this.toastController.create({
      message: 'ionViewDidLeave',
      duration: 2000
    });
    toast.present();
    console.log('ionViewDidLeave')
  }
}
