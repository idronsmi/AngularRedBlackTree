import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { RBTree } from './node';
import { InsertKey } from './tree.actions';
import { getTree, TreeState } from './tree.reducer';
import { _MatTabLinkMixinBase } from '@angular/material/tabs/typings/tab-nav-bar';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {
  public tree: RBTree;
  public nodes;
  public lines;
  public maxWidth: number;
  public maxHeight: number;
  public newNodeKey: number;

  private nodeWidth = 50;

  constructor(private store: Store<TreeState>) { }

  ngOnInit() {
    this.store.select(getTree).subscribe(tree => {
      console.log(tree);
      this.tree = tree;
      this.maxHeight = this.tree.height;
      this.maxWidth = this.calcMaxWidth(this.tree.height);
      if (this.tree.root !== this.tree.LEAF) {
        this.nodes = this.getNodes();
        this.lines = this.getLines();
      }
    });
  }

  public insertNode() {
    this.store.dispatch(new InsertKey(this.newNodeKey));
    this.newNodeKey = null;
  }

  public emptyTree() {
    return this.tree.root === this.tree.LEAF;
  }

  private getNodes() {
    return Array.from(this._preOrder(this.tree.root, this.maxWidth / 2));
  }

  private getLines() {
    return Array.from(this._lines(this.tree.root,  this.maxWidth / 2));
  }

  public currentViewBox() {
    return [0, 0, this.maxWidth, this.maxHeight * 60];
  }

  private calcMaxWidth(height: number) {
    const widthFactor = Math.pow(2, height) + 1;
    return widthFactor * this.nodeWidth;
  }

  private *_preOrder(node, xPosition = 0, depth = 0) {
    yield { node: node, depth: depth, xPosition: xPosition };
    if (node.leftChild !== this.tree.LEAF) {
      yield* this._preOrder(node.leftChild, xPosition - this.calcXOffset(depth + 1), depth + 1);
    }
    if (node.rightChild !== this.tree.LEAF) {
      yield* this._preOrder(node.rightChild, xPosition + this.calcXOffset(depth + 1), depth + 1);
    }
  }

  private *_lines(node, xPosition = 0, depth = 0, previousPosition = 0) {
    if (depth !== 0) {
      if (xPosition < previousPosition) {
        yield { x1: previousPosition - this.nodeWidth / 2, y1: ((depth - 1) * 60) + 25, x2: xPosition, y2: depth * 60};
      } else {
        yield { x1: previousPosition + this.nodeWidth / 2, y1: ((depth - 1) * 60) + 25, x2: xPosition, y2: depth * 60};
      }
    }
    if (node.leftChild !== this.tree.LEAF) {
      yield* this._lines(node.leftChild, xPosition - this.calcXOffset(depth + 1), depth + 1, xPosition);
    }
    if (node.rightChild !== this.tree.LEAF) {
      yield* this._lines(node.rightChild, xPosition + this.calcXOffset(depth + 1), depth + 1, xPosition);
    }
  }

  private calcXOffset(currentDepth: number) {
    console.log(this.maxHeight, currentDepth, Math.pow(2, this.maxHeight - (currentDepth + 1)));
    return (this.nodeWidth * Math.pow(2, this.maxHeight - (currentDepth + 1)));
  }
}
