import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html'
})
export class AccessoriesComponent {
  //public list: accessoriesList [];

  //constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
  //  http.get<accessoriesList[]>(baseUrl + 'accessoriesList').subscribe(result => {
  //    this.list = result;
  //  }, error => console.error(error));
  //}
}

//interface accessoriesList {
//  bags: string;
//  belts: string;
//  shoes: string;
//  hairbands: string;
//}
