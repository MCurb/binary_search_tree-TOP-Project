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

    //If node doesn't exist
    if (!this.find(value)) {
      return;
    }

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

      if (firstNode.left) {
        queue.enqueue(firstNode.left);
      }
      if (firstNode.right) {
        queue.enqueue(firstNode.right);
      }
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
    if (queue.isEmpty()) {
      return;
    }

    let firstNode = queue.dequeue();
    callback(firstNode);

    if (firstNode.left) {
      queue.enqueue(firstNode.left);
    }
    if (firstNode.right) {
      queue.enqueue(firstNode.right);
    }

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
        if (firstNode.left) {
          queue.enqueue(firstNode.left);
        }
        if (firstNode.right) {
          queue.enqueue(firstNode.right);
        }
      }

      treeHeight++;
    }

    return treeHeight - 1;
  }

  depth(value, currentNode = this.root, isValue) {
    if (!this.root) return null;
    if (isValue === undefined) {
      if (!this.find(value)) return null;
      isValue = true;
    }
    if (currentNode.value === value) return 0;

    //Recursive Calls
    if (value > currentNode.value && currentNode.right) {
      return 1 + this.depth(value, currentNode.right, isValue);
    }
    if (value < currentNode.value && currentNode.left) {
      return 1 + this.depth(value, currentNode.left, isValue);
    }

    return null;
  }

  isBalanced(queue) {
    if (!this.root) return;
    if (!queue) {
      queue = new Queue();
      queue.enqueue(this.root);
    }
    if (queue.isEmpty()) {
      return true;
    }

    let firstNode = queue.dequeue();
    let heightLeft;
    let heightRight;

    if (firstNode.left) {
      heightLeft = this.height(firstNode.left.value);
      queue.enqueue(firstNode.left);
    }
    if (firstNode.right) {
      heightRight = this.height(firstNode.right.value);
      queue.enqueue(firstNode.right);
    }

    if (Math.abs(heightLeft - heightRight) > 1) {
      return false;
    }

    return this.isBalanced(queue);
  }

  rebalance() {
    let treeArray = [];
    this.levelOrderForEach((node) => {
      treeArray.push(node.value);
    });
    this.root = null;
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
