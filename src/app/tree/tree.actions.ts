import { Action } from '@ngrx/store';
import { RBNode } from './node';

export enum TreeActionTypes {
  SetRoot = '[Tree] Set Root',
  InsertKey = '[Tree] Insert Key',
  DeleteNode = '[Tree] Delete Node'
}

export class SetRoot implements Action {
  readonly type = TreeActionTypes.SetRoot;
  constructor(public payload: RBNode) {}
}

export class InsertKey implements Action {
  readonly type = TreeActionTypes.InsertKey;
  constructor(public payload: number) {}
}

export class DeleteNodeByKey implements Action {
  readonly type = TreeActionTypes.DeleteNode;
  constructor(public payload: number) {}
}


export type TreeActions = SetRoot | InsertKey | DeleteNodeByKey;
