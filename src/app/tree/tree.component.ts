import { Component, OnInit } from '@angular/core';

import { Node } from './node';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  node = new Node(5);
  constructor() { }

  ngOnInit() {
  }

}
