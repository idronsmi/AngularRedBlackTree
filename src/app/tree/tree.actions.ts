import { Action } from '@ngrx/store';
import { RBNode } from './node';

export enum TreeActionTypes {
  SetRoot = '[Tree] Set Root',
  InsertNode = '[Tree] Insert Node',
  DeleteNode = '[Tree] Delete Node'
}

export class SetRoot implements Action {
  readonly type = TreeActionTypes.SetRoot;
  constructor(public payload: RBNode) {}
}

export class InsertNode implements Action {
  readonly type = TreeActionTypes.InsertNode;
  constructor(public payload: RBNode) {}
}

export class DeleteNode implements Action {
  readonly type = TreeActionTypes.DeleteNode;
  constructor(public payload: number) {}
}


export type TreeActions = SetRoot | InsertNode | DeleteNode;
