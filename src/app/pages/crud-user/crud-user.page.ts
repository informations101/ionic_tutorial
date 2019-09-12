import { Component, OnInit, ViewChild } from '@angular/core';
import { User, CrudUserService } from 'src/app/services/crud-user.service';
import { IonList, LoadingController, Platform, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-crud-user',
  templateUrl: './crud-user.page.html',
  styleUrls: ['./crud-user.page.scss'],
})
export class CrudUserPage implements OnInit {
  users: User[] = []

  newUser: User = <User>{}
  @ViewChild('userlist', { static: false }) userlist: IonList
  constructor(private loadCtrl: LoadingController, private userSerive: CrudUserService, private plt: Platform, private toastController: ToastController) {
    plt.ready().then(() => {
      this.loadUser()
    })
  }
  // CREATE

  addUser(){
    this.newUser.modified=Date.now();
    this.newUser.id=Date.now();
    this.userSerive.addUser(this.newUser).then(user=>{
      this.newUser=<User>{}
      this.showToast('user added!!!')
      this.loadUser()
    })
  }
  // READ ONE USER
  readOneUser(user:User){
    this.newUser.id=user.id
    this.newUser.username=user.username
  }
  // READ 
  loadUser() {
    this.userSerive.getUser().then(users => {
      this.users = users
    })
  }
  // UPDATE
  updateOneUser(user: User) {
    if (!user.id) {
      this.showToast('no user update!');
    } else {
      user.modified = Date.now()
      this.userSerive.updateUser(user).then(user => {
        this.newUser = <User>{}
        this.showToast('Item updated!');
        this.loadUser()
      })
    }
  }
  deleteUser(user: User) {
    console.log(user)
    if (!user.id) {
      this.showToast('no user removed!');
    } else {
      this.userSerive.deleteUser(user.id).then(user => {
        this.newUser = <User>{}
        this.showToast('user removed!');
        this.loadUser()
      })
    }
  }
  ngOnInit() {
  }
  // Helper
  async showToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
