import { Component, OnInit, ViewChild } from '@angular/core';
import { User, CrudUserService } from 'src/app/services/crud-user.service';
import { IonList, LoadingController, Platform, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-crud-user',
  templateUrl: './crud-user.page.html',
  styleUrls: ['./crud-user.page.scss'],
})
export class CrudUserPage implements OnInit {

  users: User[] = []

  newUser: User = <User>{}

  @ViewChild('userlist', { static: false }) userlist: IonList

  constructor(private auth: AuthService, private loadCtrl: LoadingController, private userSerive: CrudUserService, private plt: Platform, private toastController: ToastController) {
    plt.ready().then(() => {
      this.loadUser()
    })
  }
  signOut() {
    this.auth.signOut();
  }
  // CREATE
  async addUser() {
    this.newUser.modified = Date.now();
    this.newUser.id = Date.now();
    await this.userSerive.addUser(this.newUser).then(async user => {
      this.newUser = <User>{}
      await this.showToast('user added!!!')
      await this.loadUser()
    })
  }
  // READ ONE USER
  readOneUser(user: User) {
    this.newUser.id = user.id
    this.newUser.username = user.username
    this.newUser.password = user.password
    this.newUser.role = user.role
    this.newUser.status = user.status
  }
  // CLEAR USER
  clearUser(user: User) {
    if (!user.id) {
      this.showToast('no data to clear');
      this.newUser = <User>{};
    } else {
      this.showToast('your data\'s clear');
      this.newUser = <User>{};
    }
  }
  // READ 
  async loadUser() {
    const loading = await this.loadCtrl.create({
      message: 'Loading data ...',
    });
    await loading.present();
    const users = await this.userSerive.getUser()
    if (users != null) {
      this.users = sortByKey(users, 'modified')
    }
    await loading.dismiss();
  }
  // UPDATE
  async updateOneUser(user: User) {
    if (!user.id) {
      this.showToast('no user update!');
    } else {
      user.modified = Date.now()
      await this.userSerive.updateUser(user).then(user => {
        this.newUser = <User>{}
        this.showToast('Item updated!');
        this.loadUser()
      })
    }
  }
  // DELETE USER FUNCTION
  async deleteUser(user: User) {
    if (!user.id) {
      this.showToast('no user removed!');
    } else {
      await this.userSerive.deleteUser(user.id).then(user => {
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
  // GET VALUUE FROM SELECT
  getRole(event: { detail: { value: any; }; }) {
    // console.log(event.detail.value)
  }
  // GET VALUUE FROM RADIO
  checkValue(event: { detail: { value: any; }; }) {
    // console.log(event.detail.value)
  }
  customActionSheetOptions: any = {
    header: 'Select User Role',
    // subHeader: 'Select your favorite color'
  };
}
// SORT OBJECT ARRAY BY KEY
function sortByKey(array: User[], key: string) {
  return array.sort(function (a: { [x: string]: any; }, b: { [x: string]: any; }) {
    var x = a[key];
    var y = b[key];
    return ((x > y) ? -1 : ((x > y) ? 1 : 0));
  });
}