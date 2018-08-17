import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';

import { RBNode, preOrder, maxWidth } from './node';
import { InsertNode } from './tree.actions';
import { getRoot, TreeState } from './tree.reducer';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  public root: RBNode;
  public treeWidth: number;

  public newNodeKey: number;
  constructor(private store: Store<TreeState>) { }

  ngOnInit() {
    this.store.select(getRoot).subscribe(root => {
      this.root = root;
      this.treeWidth = maxWidth(root);
    });
  }

  insertNode() {
    this.store.dispatch(new InsertNode(new RBNode(this.newNodeKey)));
    this.newNodeKey = null;
  }

  _preOrder(node) {
    const array = Array.from(preOrder(node, this.treeWidth / 2));
    console.log(array);
    return array;
  }
}
