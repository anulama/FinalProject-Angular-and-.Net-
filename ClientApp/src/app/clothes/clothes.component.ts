import { Component } from '@angular/core';

@Component({
  selector: 'app-clothes-component',
  templateUrl: './clothes.component.html'
})
export class ClothesComponent {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
