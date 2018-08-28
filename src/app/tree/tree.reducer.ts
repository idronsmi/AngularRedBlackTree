import { createFeatureSelector, createSelector } from '@ngrx/store';

import { deepCopyRBTree, RBNode, RBTree } from './node';
import { TreeActions, TreeActionTypes } from './tree.actions';

export interface TreeState {
  tree: RBTree;
}

export const initialState: TreeState = {
  tree: new RBTree()
};

export function reducer(state = initialState, action: TreeActions): TreeState {
  switch (action.type) {

    case TreeActionTypes.SetRoot: {
      return { ...state, tree: new RBTree(action.payload) };
    }

    case TreeActionTypes.InsertKey: {
      const newTree = deepCopyRBTree(state.tree);
      newTree.insertKey(action.payload);
      console.log(newTree);
      return { ...state, tree: newTree};
    }

    default: {
      return state;
    }
  }
}
export const getTreeState = createFeatureSelector<TreeState>('tree');

export const getTree = createSelector(
  getTreeState,
  state => state.tree
);
