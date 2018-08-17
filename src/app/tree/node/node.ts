

export enum COLOR { BLACK = 0, RED = 1 }

export class RBNode {
  constructor(
    public key: Number,
    public color = COLOR.BLACK,
    public leftChild = LEAF,
    public rightChild = LEAF,
    public parent = LEAF) {
  }

  public toString(): string {
    return `Key: ${this.key}, Color: ${COLOR[this.color]}, Parent: ${this.parent ? this.parent.key : null},
                Left: ${this.leftChild ? this.leftChild.key : null}, Right: ${this.rightChild ? this.rightChild.key : null}`;
  }
}
export const LEAF = new RBNode(null);

export function insert(root: RBNode, nodeToInsert: RBNode) {

  let treeIterator = root;
  let treeIteratorParent = LEAF;
  while (treeIterator !== LEAF) {
    treeIteratorParent = treeIterator;
    if (nodeToInsert.key < treeIterator.key) {
      treeIterator = treeIterator.leftChild;
    } else {
      treeIterator = treeIterator.rightChild;
    }
  }
  nodeToInsert.parent = treeIteratorParent;
  if (treeIteratorParent === LEAF) {
    root = nodeToInsert;
  } else if (nodeToInsert.key < treeIteratorParent.key) {
    treeIteratorParent.leftChild = nodeToInsert;
  } else {
    treeIteratorParent.rightChild = nodeToInsert;
  }
  nodeToInsert.color = COLOR.RED;

  return rebalanceTree(root, nodeToInsert);
}


export function rebalanceTree(root: RBNode, insertedNode: RBNode) {
  let nodePointer = root;
  while (insertedNode.parent.color === COLOR.RED) {
    if (insertedNode.parent === insertedNode.parent.parent.leftChild) {
      const uncleNode = insertedNode.parent.parent.rightChild;
      if (uncleNode.color === COLOR.RED) {
        insertedNode.parent.color = COLOR.BLACK;
        uncleNode.color = COLOR.BLACK;
        insertedNode.parent.parent.color = COLOR.RED;
      } else {
        if (insertedNode === insertedNode.parent.rightChild) {
          insertedNode = insertedNode.parent;
          rotateLeft(root, insertedNode);
        }
        insertedNode.parent.color = COLOR.BLACK;
        insertedNode.parent.parent.color = COLOR.RED;
        nodePointer = rotateRight(root, insertedNode.parent.parent);
      }
    } else if (insertedNode.parent === insertedNode.parent.parent.rightChild) {
      const auntNode = insertedNode.parent.parent.leftChild;
      if (auntNode.color === COLOR.RED) {
        insertedNode.parent.color = COLOR.BLACK;
        auntNode.color = COLOR.BLACK;
        insertedNode.parent.parent.color = COLOR.RED;
      } else {
        if (insertedNode === insertedNode.parent.leftChild) {
          insertedNode = insertedNode.parent;
          rotateRight(root, insertedNode);
        }
        insertedNode.parent.color = COLOR.BLACK;
        insertedNode.parent.parent.color = COLOR.RED;
        nodePointer = rotateLeft(root, insertedNode.parent.parent);
      }
    }
    root.color = COLOR.BLACK;
  }
  return nodePointer;
}

export function rotateLeft(root: RBNode, nodeToRotate: RBNode) {
  const rightChild = nodeToRotate.rightChild;
  nodeToRotate.rightChild = rightChild.leftChild;
  if (rightChild.leftChild !== LEAF) {
    rightChild.leftChild.parent = nodeToRotate;
  }
  rightChild.parent = nodeToRotate.parent;
  if (nodeToRotate.parent === LEAF) {
    root = rightChild;
  } else if (nodeToRotate === nodeToRotate.parent.leftChild) {
    nodeToRotate.parent.leftChild = rightChild;
  } else {
    nodeToRotate.parent.rightChild = rightChild;
  }
  rightChild.leftChild = nodeToRotate;
  nodeToRotate.parent = rightChild;
  return root;
}

export function rotateRight(root: RBNode, nodeToRotate: RBNode) {
  const leftChild = nodeToRotate.leftChild;
  nodeToRotate.leftChild = leftChild.rightChild;
  if (leftChild.rightChild !== LEAF) {
    leftChild.rightChild.parent = nodeToRotate;
  }
  leftChild.parent = nodeToRotate.parent;
  if (nodeToRotate.parent === LEAF) {
    root = leftChild;
  } else if (nodeToRotate === nodeToRotate.parent.rightChild) {
    nodeToRotate.parent.rightChild = leftChild;
  } else {
    nodeToRotate.parent.leftChild = leftChild;
  }
  leftChild.rightChild = nodeToRotate;
  nodeToRotate.parent = leftChild;
  return root;
}

export function printTree(node: RBNode) {
  if (node.leftChild !== LEAF) {
    printTree(node.leftChild);
  }

  console.log(node.toString());

  if (node.rightChild !== LEAF) {
    printTree(node.rightChild);
  }
}

export function* preOrder(node: RBNode, xPosition, depth = 0) {
  yield { node: node, depth: depth, xPosition: xPosition };
  if (node.leftChild !== LEAF) {
    yield* preOrder(node.leftChild, xPosition - 50, depth + 1);
  }
  if (node.rightChild !== LEAF) {
    yield* preOrder(node.rightChild, xPosition + 50, depth + 1);
  }
}

export function maxWidth(root, nodeWidth = 50) {
  console.log(maxDepth(root));
  const width = (Math.pow(2 * maxDepth(root), 2) - 1) * nodeWidth;
  console.log(width);
  return width;
}

export function maxDepth(root: RBNode) {
  if (root === LEAF) {
    return 0;
  } else {
    const leftChildDepth = maxDepth(root.leftChild);
    const rightChildDepth = maxDepth(root.rightChild);

    if (leftChildDepth <= rightChildDepth) {
      return rightChildDepth + 1;
    } else {
      return leftChildDepth + 1;
    }
  }
}


export function deepCopyRBNode(node: RBNode, parentNode: RBNode) {
  if (node === LEAF) {
    return LEAF;
  }
  const newNode = new RBNode(node.key, node.color);
  newNode.leftChild = deepCopyRBNode(node.leftChild, newNode);
  newNode.rightChild = deepCopyRBNode(node.rightChild, newNode);
  if (parentNode !== null) {
    newNode.parent = parentNode;
  }
  return newNode;
}
