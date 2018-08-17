import { createFeatureSelector, createSelector } from '@ngrx/store';

import { deepCopyRBNode, insert, RBNode } from './node';
import { TreeActions, TreeActionTypes } from './tree.actions';

export interface TreeState {
  root: RBNode;
}

export const initialState: TreeState = {
  root: new RBNode(5)
};

export function reducer(state = initialState, action: TreeActions): TreeState {
  switch (action.type) {

    case TreeActionTypes.SetRoot: {
      return { ...state, root: action.payload };
    }

    case TreeActionTypes.InsertNode: {
      let newRoot: RBNode = deepCopyRBNode(state.root, null);
      console.log(newRoot, action.payload);
      newRoot = insert(newRoot, action.payload);
      console.log(newRoot);

      return { ...state, root: newRoot};
    }

    default: {
      return state;
    }
  }
}
export const getTreeState = createFeatureSelector<TreeState>('tree');

export const getRoot = createSelector(
  getTreeState,
  state => state.root
);
