import { NavController, Platform, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.page.html',
  styleUrls: ['./loading-screen.page.scss'],
})
export class LoadingScreenPage implements OnInit {

  progress = 0;
  progressbar = 0;
  timerHandler: number;
  progressText = "Ready";

  constructor(private navCtrl: NavController,
    private statusBar: StatusBar,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private toastController: ToastController
  ) {

  }

  stop() {
    if (this.timerHandler) {
      window.clearInterval(this.timerHandler);
      this.timerHandler = 0;
    }
  }

  start() {
    this.stop();
    this.progress = 0;
    this.progressbar = 0;
    this.progressText = "Please wait . . .";
    this.timerHandler = window.setInterval(() => {
      this.progress += Math.random() * 5;
      this.progressbar = this.progress / 100;
      if (this.progress >= 50) {
        this.progressText = "Please stay tuned";
      }
      if (this.progress >= 100) {
        this.progressText = "Completed"
        this.progress = 100;
        this.stop();
        this.toNextPage();
      }
    }, 100);
  }
  // ionViewDidEnter() {
  //   this.platform.ready().then(() => {
  //     this.statusBar.overlaysWebView(true);
  //     if (window.statusbar) {
  //       this.statusBar.hide();
  //     }
  //     this.statusBar.backgroundColorByHexString("#ffffff");
  //     // this.statusBar.styleDefault();
  //     this.splashScreen.hide();
  //   });
  //   this.start();
  // }
  toNextPage() {
    this.navCtrl.navigateBack('home');
  }
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

    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(true);
      if (window.statusbar) {
        this.statusBar.hide();
      }
      this.statusBar.backgroundColorByHexString("#a88d42");
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.start();

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
