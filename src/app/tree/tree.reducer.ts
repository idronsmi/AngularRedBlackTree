import { createFeatureSelector, createSelector } from '@ngrx/store';

import { deepCopyRBTree, RBTree } from './models';
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
      return { ...state, tree: newTree};
    }

    case TreeActionTypes.DeleteNode: {
      state.tree.deleteNode(action.payload);
      return { ...state, tree: deepCopyRBTree(state.tree) };
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
