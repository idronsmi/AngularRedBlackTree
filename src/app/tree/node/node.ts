

export enum COLOR { BLACK = 0, RED = 1 }

export class RBNode {
  constructor(
    public key: Number,
    public leftChild,
    public rightChild,
    public parent,
    public color = COLOR.BLACK) {
  }

  public toString(): string {
    return `Key: ${this.key}, Color: ${COLOR[this.color]}, Parent: ${this.parent ? this.parent.key : null},
                Left: ${this.leftChild ? this.leftChild.key : null}, Right: ${this.rightChild ? this.rightChild.key : null}`;
  }
}

export class RBTree {
  public root: RBNode;
  public height: number;
  public width: number;
  public LEAF = new RBNode(null, null, null, null);

  constructor(root = null) {
    this.root = root === null ? this.LEAF : root;
  }

  public insertKey(key: number) {
    this.insertNode(new RBNode(key, this.LEAF, this.LEAF, this.LEAF));
  }

  private insertNode(nodeToInsert: RBNode) {

    let treeIterator = this.root;
    let treeIteratorParent = this.LEAF;
    while (treeIterator !== this.LEAF) {
      treeIteratorParent = treeIterator;
      if (nodeToInsert.key < treeIterator.key) {
        treeIterator = treeIterator.leftChild;
      } else {
        treeIterator = treeIterator.rightChild;
      }
    }
    nodeToInsert.parent = treeIteratorParent;
    if (treeIteratorParent === this.LEAF) {
      this.root = nodeToInsert;
    } else if (nodeToInsert.key < treeIteratorParent.key) {
      treeIteratorParent.leftChild = nodeToInsert;
    } else {
      treeIteratorParent.rightChild = nodeToInsert;
    }
    nodeToInsert.color = COLOR.RED;

    this.rebalanceTree(nodeToInsert);
    this.height = this.maxDepth();
  }

  private rebalanceTree(insertedNode: RBNode) {
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
            this.rotateLeft(insertedNode);
          }
          insertedNode.parent.color = COLOR.BLACK;
          insertedNode.parent.parent.color = COLOR.RED;
          this.rotateRight(insertedNode.parent.parent);
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
            this.rotateRight(insertedNode);
          }
          insertedNode.parent.color = COLOR.BLACK;
          insertedNode.parent.parent.color = COLOR.RED;
          this.rotateLeft(insertedNode.parent.parent);
        }
      }
      this.root.color = COLOR.BLACK;
    }
  }

  private rotateLeft(nodeToRotate: RBNode) {
    const rightChild = nodeToRotate.rightChild;
    nodeToRotate.rightChild = rightChild.leftChild;
    if (rightChild.leftChild !== this.LEAF) {
      rightChild.leftChild.parent = nodeToRotate;
    }
    rightChild.parent = nodeToRotate.parent;
    if (nodeToRotate.parent === this.LEAF) {
      this.root = rightChild;
    } else if (nodeToRotate === nodeToRotate.parent.leftChild) {
      nodeToRotate.parent.leftChild = rightChild;
    } else {
      nodeToRotate.parent.rightChild = rightChild;
    }
    rightChild.leftChild = nodeToRotate;
    nodeToRotate.parent = rightChild;
  }

  private rotateRight(nodeToRotate: RBNode) {
    const leftChild = nodeToRotate.leftChild;
    nodeToRotate.leftChild = leftChild.rightChild;
    if (leftChild.rightChild !== this.LEAF) {
      leftChild.rightChild.parent = nodeToRotate;
    }
    leftChild.parent = nodeToRotate.parent;
    if (nodeToRotate.parent === this.LEAF) {
      this.root = leftChild;
    } else if (nodeToRotate === nodeToRotate.parent.rightChild) {
      nodeToRotate.parent.rightChild = leftChild;
    } else {
      nodeToRotate.parent.leftChild = leftChild;
    }
    leftChild.rightChild = nodeToRotate;
    nodeToRotate.parent = leftChild;
  }

  public printTree(node = this.root) {
    if (node.leftChild !== this.LEAF) {
      this.printTree(node.leftChild);
    }

    console.log(node.toString());

    if (node.rightChild !== this.LEAF) {
      this.printTree(node.rightChild);
    }
  }

  private calcXPosition(depth, maxWidth) {
    const xPosition = maxWidth / (Math.pow(2 * depth, 2) - 1);
    return xPosition;
  }

  private maxDepth(root = this.root) {
    if (root === this.LEAF) {
      return 0;
    } else {
      const leftChildDepth = this.maxDepth(root.leftChild);
      const rightChildDepth = this.maxDepth(root.rightChild);

      if (leftChildDepth <= rightChildDepth) {
        return rightChildDepth + 1;
      } else {
        return leftChildDepth + 1;
      }
    }
  }

}


export function deepCopyRBTree(oldTree: RBTree) {
  const newTree = new RBTree();
  const root = deepCopyRBNode(oldTree.root, null, newTree, oldTree);
  newTree.root = root;
  return newTree;
}

function deepCopyRBNode(node: RBNode, parentNode: RBNode, newTree: RBTree, oldTree: RBTree) {
  if (node === oldTree.LEAF) {
    return newTree.LEAF;
  }
  const newNode = new RBNode(node.key, newTree.LEAF, newTree.LEAF, newTree.LEAF, node.color);
  newNode.leftChild = deepCopyRBNode(node.leftChild, newNode, newTree, oldTree);
  newNode.rightChild = deepCopyRBNode(node.rightChild, newNode, newTree, oldTree);
  if (parentNode !== null) {
    newNode.parent = parentNode;
  }
  return newNode;
}
