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
export class NodeComponent {
  @Input() node: RBNode;
  @Input() x: number;
  @Input() y: number;
  @Input() nodeWidth: number;
  @Input() nodeHeight: number;


  constructor(private store: Store<TreeState>) { }

  public getCloseXPath() {
    const fifteenPerHeight = this.nodeHeight * .16;
    const fivePerHeight = this.nodeHeight * .02;

    const ninetyFivePerWidth = this.nodeWidth * .98;
    const eightyFivePerWidth = this.nodeWidth * .83;


    return `M ${eightyFivePerWidth},${fifteenPerHeight} ` +
           `L ${ninetyFivePerWidth},${fivePerHeight} ` +
           `M ${eightyFivePerWidth},${fivePerHeight} ` +
           `L ${ninetyFivePerWidth},${fifteenPerHeight}`;
  }

  public getCloseBoxPath() {
    const eightyPerWidth = this.nodeWidth * .8;
    const twentyPerHeight = this.nodeHeight * .2;

    return `M ${eightyPerWidth},0 ` +
           `L ${eightyPerWidth},${twentyPerHeight} ` +
           `M ${eightyPerWidth},${twentyPerHeight} ` +
           `L ${this.nodeWidth},${twentyPerHeight}`;
  }

  public getCloseRectTranslate() {
    return `translate(${this.nodeWidth * .8}, 0)`;
  }

  public deleteNode() {
    this.store.dispatch(new DeleteNode(this.node));
  }
}
