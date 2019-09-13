import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
export interface User {
  [x: string]: any;
  id: number,
  username: string,
  password: string,
  role: string,
  status: string,
  modified: number
}
const USERS_KEY = 'user_key'
const TOKEN_KEY = 'user-access-token';
@Injectable({
  providedIn: 'root'
})
export class CrudUserService {

  constructor(private storage: Storage) { }
  // ADD USER
  async addUser(user: User) {
    const users = await this.storage.get(USERS_KEY)
    if (users) {
      users.push(user)
      return this.storage.set(USERS_KEY, users)
    } else {
      return this.storage.set(USERS_KEY, [user])
    }
  }

  async getUserByCredential(username, pw): Promise<User> {
    let user
    const users = await this.storage.get(USERS_KEY)
    if (!users || users.length === 0) {
      return null
    } else {
      let toKeep: User[] = []
      for (let i of users) {
        if (i.username == username && i.password == pw) {
          toKeep.push(i)
        }else{
          // toKeep=null
        }
      }
       user=this.storage.set(TOKEN_KEY, toKeep)
    }
    return user;
  }
  // READ USER
  getUser() {
    return this.storage.get(USERS_KEY)
  }
  async updateUser(user: User): Promise<any> {
    const users = await this.storage.get(USERS_KEY)
    if (!users || users.length === 0) {
      return null
    } else {
      let newUser: User[] = []
      for (let i of users) {
        if (i.id === user.id) {
          newUser.push(user)
        } else {
          newUser.push(i)
        }
      }
      return this.storage.set(USERS_KEY, newUser)
    }
  }
  async deleteUser(id: number): Promise<User> {
    const users = await this.storage.get(USERS_KEY)
    if (!users || users.length === 0) {
      return null
    } else {
      let toKeep: User[] = []
      for (let i of users) {
        if (i.id !== id) {
          toKeep.push(i)
        }
      }
      return this.storage.set(USERS_KEY, toKeep)
    }
  }
}
