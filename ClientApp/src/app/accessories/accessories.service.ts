import { Injectable, EventEmitter } from '@angular/core';
import { Accessories } from './accessories.component';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";

@Injectable()
export class AccessoriesService {
  accessoriesListChangedEvent = new Subject<Accessories[]>();
  private accessories: Accessories[] = [];
  maxAccessoriesId: number;

  constructor(private http: HttpClient) {
    this.maxAccessoriesId = this.getMaxId();
  }

  getAccessories() {
    this.http.get('https://anucms.firebaseio.com/accessories.json')
      .subscribe(
        (accessories: Accessories[]) => {
          this.accessories = accessories;
          this.maxAccessoriesId = this.getMaxId();
          this.accessoriesListChangedEvent.next(this.accessories.slice())
        }
      );
    //error function
    (error: any) => {
      console.log(error);
    }
    return this.accessories.slice();
  }

  getAccessories(id: string): Accessories {
    let foundAccessories = null;
    this.accessories.forEach((accessories) => {
      if (accessories.id === id) {
        foundAccessories = accessories;
      }
    });
    return foundAccessories;
  }

  getMaxId(): number {
    let maxId = 0;
    this.accessories.forEach(accessories => {
      if (+accessories.id > maxId) maxId = +accessories.id;
    });
    return maxId + 1;
  }

  addAccessories(newAcc: Accessories) {
    if (newAcc) {
      newAcc.id = `${this.maxId++}`;
      this.accessories.push(newAcc);
      let accessoriesClone = this.accessories.slice();
      this.storeAccessories();
    }
  }

  updateAccessories(originalAccessories: Accessories, newAccessories: Accessories) {
    if (originalAccessories && newAccessories) {
      let realOGCon = this.accessories.find(accessories => {
        return accessories.id === originalAccessories.id;
      });
      let pos = this.accessories.indexOf(realOGCon);
      if (pos > -1) {
        newAccessories.id = originalAccessories.id;
        this.accessories[pos] = newAccessories;
        let accessoriesClone = this.accessories.slice();
        this.storeAccessories();
      }
    }
  }

  deleteAccessories(accessories: Accessories) {
    if (!accessories || !this.accessories.includes(accessories)) {
      return;
    }

    const pos = this.accessories.indexOf(accessories);
    let accessoriesClone = this.accessories.slice();
    this.storeAccessories();
  }

  storeAccessories() {
    let stringToServer = JSON.stringify(this.accessories);
    let header = new HttpHeaders({
      "Accessories-Type": "application/json"
    });
    this.http.put('https://anucms.firebaseio.com/accessories.json', stringToServer, { headers: header })
      .subscribe(result => {
        this.accessoriesListChangedEvent.next(Object.assign(this.accessories));
      });
  }
}
