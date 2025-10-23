class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor() {
    this.root = null;
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false,
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  buildTree(array, start = 0, end = 0) {
    //If it's first call, sort array
    if (!this.root) {
      array = [...new Set(array)].sort((a, b) => a - b);
      start = 0;
      end = array.length - 1;
    }
    //If no more nodes return null
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);

    if (!this.root) {
      this.root = node;
    }
    node.left = this.buildTree(array, start, mid - 1);
    node.right = this.buildTree(array, mid + 1, end);

    return node;
  }

  insert(value) {
    this.root = this.#insertRecursive(value, this.root);
  }

  #insertRecursive(value, currentNode) {
    if (!currentNode) return new Node(value);

    if (currentNode.value === value) return currentNode;

    if (value > currentNode.value) {
      currentNode.right = this.#insertRecursive(value, currentNode.right);
    } else {
      currentNode.left = this.#insertRecursive(value, currentNode.left);
    }

    return currentNode;
  }

  deleteItem(value, currentNode = this.root) {
    //If tree is empty
    if (!currentNode) return;

    //If leaf node
    if (
      currentNode.value === value &&
      !currentNode.left &&
      !currentNode.right
    ) {
      return null;
    }

    //If node has one child
    if (
      (currentNode.value === value && !currentNode.left) ||
      !currentNode.right
    ) {
      return currentNode.right || currentNode.left;
    }

    //If node has two children
    if (currentNode.value === value && currentNode.left && currentNode.right) {
      let replacement = currentNode.right;

      while (replacement.left) {
        replacement = replacement.left;
      }

      this.deleteItem(replacement.value, this.root);
      currentNode.value = replacement.value;
      return currentNode;
    }

    //Recursive Calls
    if (value > currentNode.value) {
      currentNode.right = this.deleteItem(value, currentNode.right);
    } else {
      currentNode.left = this.deleteItem(value, currentNode.left);
    }

    return currentNode;
  }

  find(value, currentNode = this.root) {
    if (!currentNode) return 'Not found';

    if (currentNode.value === value) {
      return currentNode;
    }

    //Recursive Calls
    if (value > currentNode.value) {
      return this.find(value, currentNode.right);
    } else {
      return this.find(value, currentNode.left);
    }
  }
}

const tree = new Tree();

tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.insert(148);
tree.insert(148);
tree.deleteItem(67);
tree.prettyPrint(tree.root);
console.log(tree.find(148));
