import { Injectable, EventEmitter } from '@angular/core';
import { Clothes } from './clothes.component';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

@Injectable()
export class ClothesService {
  clothesListChangedEvent = new Subject<Clothes[]>();
  private clothes: Clothes[] = [];
  maxClothesId: number;

  constructor(private http: HttpClient) {
    this.maxClothesId = this.getMaxId();
  }

  getClothes() {
    this.http.get('https://anucms.firebaseio.com/clothes.json')
      .subscribe(
        (clothes: Clothes[]) => {
          this.clothes = clothes;
          this.maxClothesId = this.getMaxId();
          this.clothesListChangedEvent.next(this.clothes.slice())
        }
      );
    //error function
    (error: any) => {
      console.log(error);
    }
    return this.clothes.slice();
  }

  getClothes(id: string): Clothes {
    let foundClothes = null;
    this.clothes.forEach((clothes) => {
      if (clothes.id === id) {
        foundClothes = clothes;
      }
    });
    return foundClothes;
  }

  getMaxId(): number {
    let maxId = 0;
    this.clothes.forEach(clothes => {
      if (+clothes.id > maxId) maxId = +clothes.id;
    });
    return maxId + 1;
  }

  addClothes(newClo: Clothes) {
    if (newClo) {
      newClo.id = `${this.maxId++}`;
      this.clothes.push(newClo);
      let clothesClone = this.clothes.slice();
      this.storeClothes();
    }
  }

  updateClothes(originalClothes: Clothes, newClothes: Clothes) {
    if (originalClothes && newClothes) {
      let realOGCon = this.clothes.find(clothes => {
        return clothes.id === originalClothes.id;
      });
      let pos = this.clothes.indexOf(realOGCon);
      if (pos > -1) {
        newClothes.id = originalClothes.id;
        this.clothes[pos] = newClothes;
        let clothesClone = this.clothes.slice();
        this.storeClothes();
      }
    }
  }

  deleteClothes(clothes: Clothes) {
    if (!clothes || !this.clothes.includes(clothes)) {
      return;
    }

    const pos = this.clothes.indexOf(clothes);
    let clothesClone = this.clothes.slice();
    this.storeClothes();
  }

  storeClothes() {
    let stringToServer = JSON.stringify(this.clothes);
    let header = new HttpHeaders({
      "Clothes-Type": "application/json"
    });
    this.http.put('https://anucms.firebaseio.com/clothes.json', stringToServer, { headers: header })
      .subscribe(result => {
        this.clothesListChangedEvent.next(Object.assign(this.clothes));
      });
  }
}
