export class Queue {
  constructor() {
    this.array = [];
  }

  queueLength() {
    return this.array.length;
  }

  isEmpty() {
    return this.array.length === 0 ? true : false;
  }

  enqueue(node) {
    this.array.push(node);
  }

  dequeue() {
    return this.array.shift();
  }
}
