import { Queue } from './queue';

export class Tree {
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

  buildTree(array) {
    const sortedArr = [...new Set(array)].sort((a, b) => a - b);
    this.root = this.#buildTreeRecursive(sortedArr, 0, sortedArr.length - 1);
  }

  #buildTreeRecursive(array, start, end) {
    //If no more nodes return null
    if (start > end) return null;

    const mid = Math.floor((start + end) / 2);
    const node = new Node(array[mid]);

    node.left = this.#buildTreeRecursive(array, start, mid - 1);
    node.right = this.#buildTreeRecursive(array, mid + 1, end);

    return node;
  }

  insert(value) {
    this.root = this.#insertRecursive(value, this.root);
  }

  #insertRecursive(value, currentNode) {
    if (!currentNode) return new Node(value);

    if (currentNode.value === value) return currentNode;

    if (value < currentNode.value) {
      currentNode.left = this.#insertRecursive(value, currentNode.left);
    } else {
      currentNode.right = this.#insertRecursive(value, currentNode.right);
    }

    return currentNode;
  }

  deleteItem(value, currentNode = this.root) {
    if (!currentNode) return null;

    if (value < currentNode.value) {
      currentNode.left = this.deleteItem(value, currentNode.left);
    } else if (value > currentNode.value) {
      currentNode.right = this.deleteItem(value, currentNode.right);
    } else {
      //Node found, handle deletion cases:

      //Leaf node:
      if (!currentNode.left && !currentNode.right) return null;

      //If node has one child
      if (!currentNode.left) return currentNode.right;
      if (!currentNode.right) return currentNode.left;

      //If node has two children
      let replacement = currentNode.right;

      while (replacement.left) replacement = replacement.left;
      currentNode.value = replacement.value;
      currentNode.right = this.deleteItem(replacement.value, currentNode.right);
    }

    return currentNode;
  }

  find(value, currentNode = this.root) {
    if (!currentNode) return null;

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

  levelOrderForEach(callback) {
    if (!this.root) return;
    if (!callback) {
      throw new Error('Callback function is required');
    }

    //I need to traverse the tree in level order using a queue
    const queue = new Queue();
    queue.enqueue(this.root);

    while (!queue.isEmpty()) {
      let firstNode = queue.dequeue();
      callback(firstNode);

      if (firstNode.left) queue.enqueue(firstNode.left);
      if (firstNode.right) queue.enqueue(firstNode.right);
    }
  }

  levelOrderForEachRecursive(callback, queue) {
    if (!this.root) return;
    if (!callback) {
      throw new Error('Callback function is required');
    }
    if (!queue) {
      queue = new Queue();
      queue.enqueue(this.root);
    }
    if (queue.isEmpty()) return;

    let firstNode = queue.dequeue();
    callback(firstNode);

    if (firstNode.left) queue.enqueue(firstNode.left);
    if (firstNode.right) queue.enqueue(firstNode.right);

    this.levelOrderForEachRecursive(callback, queue);
  }

  preOrderForEach(callback, node = this.root) {
    if (!callback) {
      throw new Error('Callback function is required');
    }
    if (!node) return;

    callback(node);
    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }

  inOrderForEach(callback, node = this.root) {
    if (!callback) {
      throw new Error('Callback function is required');
    }
    if (!node) return;

    this.inOrderForEach(callback, node.left);
    callback(node);
    this.inOrderForEach(callback, node.right);
  }

  postOrderForEach(callback, node = this.root) {
    if (!callback) {
      throw new Error('Callback function is required');
    }
    if (!node) return;

    this.postOrderForEach(callback, node.left);
    this.postOrderForEach(callback, node.right);
    callback(node);
  }

  height(value) {
    if (!this.root) return null;

    const node = this.find(value);
    if (!node) return null;

    const queue = new Queue();
    queue.enqueue(node);

    let treeHeight = 0;
    while (!queue.isEmpty()) {
      let levelSize = queue.queueLength();

      for (let i = 0; i < levelSize; i++) {
        const firstNode = queue.dequeue();

        if (firstNode.left) queue.enqueue(firstNode.left);
        if (firstNode.right) queue.enqueue(firstNode.right);
      }

      treeHeight++;
    }

    return treeHeight - 1;
  }

  depth(value, currentNode = this.root, currentDepth = 0) {
    if (!currentNode) return null;
    if (currentNode.value === value) return currentDepth;

    //Recursive Calls
    if (value > currentNode.value) {
      return this.depth(value, currentNode.right, currentDepth + 1);
    } else {
      return this.depth(value, currentNode.left, currentDepth + 1);
    }
  }

  isBalanced() {
    if (!this.root) return null;

    let leftHeight = 0;
    let rightHeight = 0;
    let maxHeightDiff = 0;

    this.levelOrderForEach((node) => {
      // Left Height
      if (node.left) leftHeight = this.height(node.left.value);

      // Right Height
      if (node.right) rightHeight = this.height(node.right.value);

      //Height difference
      const currentDiff = Math.abs(leftHeight - rightHeight);

      // Always keep the heighest difference
      maxHeightDiff = maxHeightDiff < currentDiff ? currentDiff : maxHeightDiff;
    });

    return maxHeightDiff <= 1;
  }

  isBalancedRecursive(currentNode = this.root) {
    if (currentNode === null) return true;

    const leftHeight = this._height(currentNode.left);
    const rightHeight = this._height(currentNode.right);

    const balanceFactor = Math.abs(leftHeight - rightHeight);

    return (
      balanceFactor <= 1 &&
      this.isBalancedRecursive(currentNode.left) &&
      this.isBalancedRecursive(currentNode.right)
    );
  }

  _height(node) {
    if (node === null) return -1;
    return 1 + Math.max(this._height(node.left), this._height(node.right));
  }

  rebalance() {
    let treeArray = [];

    this.levelOrderForEach((node) => treeArray.push(node.value));

    this.buildTree(treeArray);
  }
}

class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}
