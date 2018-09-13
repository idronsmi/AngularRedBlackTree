import { COLOR, RBNode } from './node';

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

  public deleteNode(nodeToDelete: RBNode) {
    let nodePtr = nodeToDelete;
    let node2Ptr: RBNode;
    let originalColor = nodePtr.color;

    if (nodeToDelete.leftChild === this.LEAF) {
      node2Ptr = nodeToDelete.rightChild;
      this.transplant(nodeToDelete, nodeToDelete.rightChild);
    } else if (nodeToDelete.rightChild === this.LEAF) {
      node2Ptr = nodeToDelete.leftChild;
      this.transplant(nodeToDelete, nodeToDelete.leftChild);
    } else {
      nodePtr = this.treeMin(nodeToDelete.rightChild);
      originalColor = nodePtr.color;
      node2Ptr = nodePtr.rightChild;

      if (nodePtr.parent === nodeToDelete) {
        node2Ptr.parent = nodePtr;
      } else {
        this.transplant(nodePtr, nodePtr.rightChild);
        nodePtr.rightChild = nodeToDelete.rightChild;
        nodePtr.rightChild.parent = nodePtr;
      }

      this.transplant(nodeToDelete, nodePtr);
      nodePtr.leftChild = nodeToDelete.leftChild;
      nodePtr.leftChild.parent = nodePtr;
      nodePtr.color = nodeToDelete.color;
    }

    if (originalColor === COLOR.BLACK) {
      this.deleteRebalanceTree(node2Ptr);
    }
    this.height = this.maxDepth();
  }

  private deleteRebalanceTree(node: RBNode) {
    while (node !== this.root && node.color === COLOR.BLACK) {
      if (node === node.parent.leftChild) {
        let nodePtr = node.parent.rightChild;

        if (nodePtr.color === COLOR.RED) {
          nodePtr.color = COLOR.BLACK;
          node.parent.color = COLOR.RED;
          this.rotateLeft(node.parent);
          nodePtr = node.parent.rightChild;
        }

        if (nodePtr.leftChild.color === COLOR.BLACK) {
          nodePtr.color = COLOR.RED;
          node = node.parent;
        } else {

          if (nodePtr.rightChild.color === COLOR.BLACK) {
            nodePtr.leftChild.color = COLOR.BLACK;
            nodePtr.color = COLOR.RED;
            this.rotateRight(nodePtr);
            nodePtr = node.parent.rightChild;
          }

          nodePtr.color = node.parent.color;
          node.parent.color = COLOR.BLACK;
          nodePtr.rightChild.color = COLOR.BLACK;
          this.rotateLeft(node.parent);
          node = this.root;
        }
      } else {
        let nodePtr = node.parent.leftChild;

        if (nodePtr.color === COLOR.RED) {
          nodePtr.color = COLOR.BLACK;
          node.parent.color = COLOR.RED;
          this.rotateRight(node.parent);
          nodePtr = node.parent.leftChild;
        }

        if (nodePtr.rightChild.color === COLOR.BLACK) {
          nodePtr.color = COLOR.RED;
          node = node.parent;
        } else {

          if (nodePtr.leftChild.color === COLOR.BLACK) {
            nodePtr.rightChild.color = COLOR.BLACK;
            nodePtr.color = COLOR.RED;
            this.rotateLeft(nodePtr);
            nodePtr = node.parent.leftChild;
          }

          nodePtr.color = node.parent.color;
          node.parent.color = COLOR.BLACK;
          nodePtr.leftChild.color = COLOR.BLACK;
          this.rotateRight(node.parent);
          node = this.root;
        }
      }
    }
    node.color = COLOR.BLACK;
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
    this.insertRebalanceTree(nodeToInsert);
    this.height = this.maxDepth();
  }

  private insertRebalanceTree(insertedNode: RBNode) {
    while (insertedNode.parent.color === COLOR.RED) {
      if (insertedNode.parent === insertedNode.parent.parent.leftChild) {
        const uncleNode = insertedNode.parent.parent.rightChild;

        if (uncleNode.color === COLOR.RED) {
          insertedNode.parent.color = COLOR.BLACK;
          uncleNode.color = COLOR.BLACK;
          insertedNode.parent.parent.color = COLOR.RED;
          insertedNode = insertedNode.parent.parent;
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
          insertedNode = insertedNode.parent.parent;
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

  private transplant(node: RBNode, node2: RBNode) {
    if (node.parent === this.LEAF) {
      this.root = node2;
    } else if (node === node.parent.leftChild) {
      node.parent.leftChild = node2;
    } else {
      node.parent.rightChild = node2;
    }

    node2.parent = node.parent;
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

  public maxDepth(root = this.root) {
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

  private treeMin(nodeToIterate: RBNode) {
    while (nodeToIterate.leftChild !== this.LEAF) {
      nodeToIterate = nodeToIterate.leftChild;
    }
    return nodeToIterate;
  }
  
  private treeMax(nodeToIterate: RBNode) {
    while (nodeToIterate.rightChild !== this.LEAF) {
      nodeToIterate = nodeToIterate.rightChild;
    }
    return nodeToIterate;
  }
}

export function deepCopyRBTree(oldTree: RBTree) {
  const newTree = new RBTree();
  const root = deepCopyRBNode(oldTree.root, null, newTree, oldTree);

  newTree.root = root;
  newTree.height = newTree.maxDepth();
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
