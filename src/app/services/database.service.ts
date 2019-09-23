import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite/ngx';

export interface Dev {
  id: number,
  name: string,
  skills: any[],
  img: string
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  developers = new BehaviorSubject([]);
  products = new BehaviorSubject([]);

  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'developers.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
        });
    });
  }

  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text' })
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(_ => {
            this.loadDevelopers();
            this.loadProducts();
            this.dbReady.next(true);
          })
          .catch(e => console.error(e));
      });
  }

  getDatabaseState() {
    return this.dbReady.asObservable();
  }

  getDevs(): Observable<Dev[]> {
    return this.developers.asObservable();
  }

  getProducts(): Observable<any[]> {
    return this.products.asObservable();
  }
  async loadDevelopers() {
    const data = await this.database.executeSql('SELECT * FROM developer', []);
    let developers: Dev[] = [];
    if (data.rows.length > 0) {
      for (var i = 0; i < data.rows.length; i++) {
        let skills = [];
        if (data.rows.item(i).skills != '') {
          skills = JSON.parse(data.rows.item(i).skills);
        }
        developers.push({
          id: data.rows.item(i).id,
          name: data.rows.item(i).name,
          skills: skills,
          img: data.rows.item(i).img
        });
      }
    }
    this.developers.next(developers);
  }

  async addDeveloper(name: any, skills: any, img: any) {
    let data = [name, JSON.stringify(skills), img];
    const data_1 = await this.database.executeSql('INSERT INTO developer (name, skills, img) VALUES (?, ?, ?)', data);
    this.loadDevelopers();
  }

  async getDeveloper(id: string): Promise<Dev> {
    const data = await this.database.executeSql('SELECT * FROM developer WHERE id = ?', [id]);
    let skills = [];
    if (data.rows.item(0).skills != '') {
      skills = JSON.parse(data.rows.item(0).skills);
    }
    return {
      id: data.rows.item(0).id,
      name: data.rows.item(0).name,
      skills: skills,
      img: data.rows.item(0).img
    };
  }

  async deleteDeveloper(id: number) {
    const _ = await this.database.executeSql('DELETE FROM developer WHERE id = ?', [id]);
    this.loadDevelopers();
    this.loadProducts();
  }

  async updateDeveloper(dev: Dev) {
    let data = [dev.name, JSON.stringify(dev.skills), dev.img];
    const data_1 = await this.database.executeSql(`UPDATE developer SET name = ?, skills = ?, img = ? WHERE id = ${dev.id}`, data);
    this.loadDevelopers();
  }

  async loadProducts() {
    let query = 'SELECT product.name, product.id, developer.name AS creator FROM product JOIN developer ON developer.id = product.creatorId';
    const data = await this.database.executeSql(query, []);
    let products = [];
    if (data.rows.length > 0) {
      for (var i = 0; i < data.rows.length; i++) {
        products.push({
          name: data.rows.item(i).name,
          id: data.rows.item(i).id,
          creator: data.rows.item(i).creator,
        });
      }
    }
    this.products.next(products);
  }

  async addProduct(name: any, creator: any) {
    let data = [name, creator];
    const data_1 = await this.database.executeSql('INSERT INTO product (name, creatorId) VALUES (?, ?)', data);
    this.loadProducts();
  }
}