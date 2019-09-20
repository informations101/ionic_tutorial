import { NavController, Platform } from '@ionic/angular';
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
    private splashScreen: SplashScreen
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
      this.progressbar += (Math.random() * 5) / 100;
      if (this.progress >= 50) {
        this.progressText = "Please stay tuned";
      }
      if (this.progress >= 100) {
        this.progressText = "Completed"
        this.progress = 100;
        this.stop();
        this.toNextPage();
      }
    }, 600);
  }
  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(true);
      if (window.statusbar) {
        this.statusBar.hide();
      }
      this.statusBar.backgroundColorByHexString("#ffffff");
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.start();
  }
  ngOnInit() {
  }
  toNextPage() {
    this.navCtrl.navigateForward('home');
  }
}
