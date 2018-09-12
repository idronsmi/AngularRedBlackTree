export enum COLOR { BLACK = 0, RED = 1 }

export class RBNode {
  constructor(
    public key: Number,
    public leftChild: RBNode,
    public rightChild: RBNode,
    public parent: RBNode,
    public color = COLOR.BLACK) {
  }

  public toString(): string {
    return `Key: ${this.key}, Color: ${COLOR[this.color]}, Parent: ${this.parent ? this.parent.key : null},
                Left: ${this.leftChild ? this.leftChild.key : null}, Right: ${this.rightChild ? this.rightChild.key : null}`;
  }
}




