import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { RBTree } from './node';
import { InsertKey } from './tree.actions';
import { getTree, TreeState } from './tree.reducer';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  public tree: RBTree;
  public maxWidth: number;
  public newNodeKey: number;

  private nodeWidth = 50;

  constructor(private store: Store<TreeState>) { }

  ngOnInit() {
    this.store.select(getTree).subscribe(tree => {
      console.log(tree);
      this.tree = tree;
      this.maxWidth = this.calcTreeWidth();
    });
  }

  public insertNode() {
    this.store.dispatch(new InsertKey(this.newNodeKey));
    this.newNodeKey = null;
  }

  public emptyTree() {
    return this.tree.root === this.tree.LEAF;
  }

  public preOrder() {
    const array = Array.from(this._preOrder(this.tree.root, (this.tree.width / 2)));
    console.log(array);
    return array;
  }

  public currentViewBox() {
    return [0, 0, this.tree.width, 1000];
  }

  private calcTreeWidth() {
    const width = (Math.pow(2 * this.tree.height, 2) - 1) * this.nodeWidth;
    return width;
  }

  private *_preOrder(node, xPosition = 0, depth = 0) {
    yield { node: node, depth: depth, xPosition: xPosition - 25 };
    if (node.leftChild !== this.tree.LEAF) {
      yield* this._preOrder(node.leftChild, xPosition - (xPosition / 2), depth + 1);
    }
    if (node.rightChild !== this.tree.LEAF) {
      yield* this._preOrder(node.rightChild, xPosition + (xPosition / 2), depth + 1);
    }
  }

  private calcXOffset(nodeWidth = 50) {

  }

}
