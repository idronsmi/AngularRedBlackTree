import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { RBTree } from '../models';
import { InsertKey } from '../tree.actions';
import { getTree, TreeState } from '../tree.reducer';

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

  public nodeWidth = 50;
  public nodeHeight = 50;

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
    return Array.from(this._lines(this.tree.root, this.maxWidth / 2));
  }

  public currentViewBox() {
    return [0, 0, this.maxWidth, this.maxHeight * this.getNodeHeightSpacer()];
  }

  private calcMaxWidth(height: number) {
    const widthFactor = Math.pow(2, height) + 1;
    return widthFactor * this.nodeWidth;
  }

  /** PreOrder generator */
  private *_preOrder(node, xPosition = 0, depth = 0) {
    yield { node: node, depth: depth, xPosition: xPosition };

    if (node.leftChild !== this.tree.LEAF) {
      yield* this._preOrder(node.leftChild, xPosition - this.calcXOffset(depth + 1), depth + 1);
    }

    if (node.rightChild !== this.tree.LEAF) {
      yield* this._preOrder(node.rightChild, xPosition + this.calcXOffset(depth + 1), depth + 1);
    }
  }

  /** Generator for the x,y postioning for lines between nodes, given the root node */
  private *_lines(node, xPosition = 0, depth = 0, previousPosition = 0) {

    // root doesn't need lines
    // TODO: toggle leaf nodes

    if (depth !== 0) {
      if (xPosition < previousPosition) {
        yield {
          x1: previousPosition - (this.nodeWidth / 2),
          y1: ((depth - 1) * this.getNodeHeightSpacer()) + (this.nodeHeight / 2),
          x2: xPosition,
          y2: depth *  this.getNodeHeightSpacer()
        };
      } else {
        yield {
          x1: previousPosition + (this.nodeWidth / 2),
          y1: ((depth - 1) * this.getNodeHeightSpacer()) + (this.nodeHeight / 2),
          x2: xPosition,
          y2: depth * this.getNodeHeightSpacer()
        };
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
    // console.log(`node width: ${this.nodeWidth}, max height: ${this.maxHeight}, current depth: ${currentDepth}`);
    // console.log(`number of nodes: ${Math.pow(2, this.maxHeight - (currentDepth + 1))}`);
    // console.log((this.nodeWidth * Math.pow(2, this.maxHeight - (currentDepth + 1))));
    return (this.nodeWidth * Math.pow(2, this.maxHeight - (currentDepth + 1)));
  }

  private getNodeHeightSpacer() {
    return 1.2 * this.nodeHeight;
  }

}
