import { Component, Input, OnInit } from '@angular/core';

import { RBNode } from './node';

@Component({
  selector: '[app-node]', // tslint:disable-line component-selector
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {
  @Input() node: RBNode;
  @Input() x: number;
  @Input() y: number;
  constructor() { }

  ngOnInit() {
  }

}
