import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
export interface User {
  id: number,
  username: string,
  password: string,
  role: string,
  status: string,
  modified: number
}
const USERS_KEY = 'user_key'
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
  // READ USER
  getUser() {
    return this.storage.get(USERS_KEY)
  }
  // READ ONE USER
  readOneUserByUsernameAndPassword(username, password) {
    // 
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
