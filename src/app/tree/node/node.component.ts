import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { RBNode } from '../models';
import { DeleteNode } from '../tree.actions';
import { TreeState } from '../tree.reducer';

@Component({
  selector: '[app-node]', // tslint:disable-line component-selector
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {
  @Input() node: RBNode;
  @Input() x: number;
  @Input() y: number;

  constructor(private store: Store<TreeState>) { }

  ngOnInit() {
  }

  deleteNode() {
    this.store.dispatch(new DeleteNode(this.node));
  }
}
