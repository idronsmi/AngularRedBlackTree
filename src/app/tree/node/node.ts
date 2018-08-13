

export enum COLOR { BLACK = 0, RED = 1 }

export class Node {
    constructor(
        public key: number,
        public color = COLOR.BLACK,
        public leftChild = LEAF,
        public rightChild = LEAF,
        public parent: Node = null) {
    }

    public toString(): string {
        return `Key: ${this.key}, Color: ${COLOR[this.color]}, Parent: ${this.parent ? this.parent.key : null},
                Left: ${this.leftChild ? this.leftChild.key : null}, Right: ${this.rightChild ? this.rightChild.key : null}`;
    }
}
const LEAF = new Node(null);

export function insert(root: Node, nodeToInsert: Node): void {

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

    rebalanceTree(root, nodeToInsert);
}


export function rebalanceTree(root: Node, insertedNode: Node) {
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
                rotateRight(root, insertedNode.parent.parent);
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
                rotateLeft(root, insertedNode.parent.parent);
            }
        }
        root.color = COLOR.BLACK;
    }
}

export function rotateLeft(root: Node, nodeToRotate: Node) {
    const rightChild = nodeToRotate.rightChild;
    console.log(`Rotate Left: ${nodeToRotate}`);
    console.log(`right child: ${rightChild}`);
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
}

export function rotateRight(root: Node, nodeToRotate: Node) {
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
}

export function printTree(node: Node) {
    if (node.leftChild !== LEAF) {
        printTree(node.leftChild);
    }

    console.log(node.toString());

    if (node.rightChild !== LEAF) {
        printTree(node.rightChild);
    }
}
