import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-line]', // tslint:disable-line component-selector
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent implements OnInit {
  @Input() x1: number;
  @Input() x2: number;

  @Input() y1: number;
  @Input() y2: number;

  constructor() { }

  ngOnInit() {
  }

}
