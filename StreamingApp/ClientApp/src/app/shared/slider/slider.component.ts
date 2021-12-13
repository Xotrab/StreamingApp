import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  public counter: number = 0;
  public itemAmount: number = 8;

  constructor() { }

  public ngOnInit(): void {
  }

  public onNext(): void {
    this.counter++;
  }

  public onPrevious(): void {
    if (this.counter > 0) {
      this.counter--;
    }
  }

}
