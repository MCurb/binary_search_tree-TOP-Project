# 🌳 Balanced Binary Search Tree (BST)
This project is part of my **Data Structures and Algorithms** practice from [The Odin Project](https://www.theodinproject.com/dashboard). 
It focuses on building a **Balanced Binary Search Tree** from scratch in **JavaScript**, to better understand how data structures work under the hood.

## 🧠 Key Learnings
- Implemented a **Balanced Binary Search Tree** from scratch
- Learned how to use a **Queue** to perform level-order traversal
- Deepened my understanding of **JavaScript Classes** and recursion
- Practiced **time complexity analysis** for various tree operations
- Strengthened my understanding of **references and immutability** in data structures

## ⚙️ Project Overview

### Classes

#### 🧩 Node 
Represent each node in the tree
**Properties:**
- `value`: the stored data
- `left`: pointer to the left child
- `right`: pointer to the right child

#### 🪣 Queue
Used to manage nodes during **level-order traversal.**
#### Methods:
- `enqueue(node)`
- `dequeue()`
- `queueLength()`
- `isEmpty()`

#### 🌲 Tree
The main structure that stores nodes and provides operations to interact with them.

#### Core Methods:

- `prettyPrint()` → visualize the tree in the console
- `buildTree(array)` → create a balanced BST from an array
- `insert(value)` → insert a new node
- `deleteItem(value)` → remove a node
- `find(value)` → search for a value
- `levelOrderForEach(callback)` → breadth-first traversal
- `preOrderForEach(callback)` → depth-first (root → left → right)
- `inOrderForEach(callback)` → depth-first (left → root → right)
- `postOrderForEach(callback)` → depth-first (left → right → root)
- `height(node)` → find the height of a given node
- `depth(node)` → find how deep a node is from the root
- `isBalanced()` → check if the tree is balanced
- `rebalance()` → balance an unbalanced tree

## 🔧 Features
  
- ✅ Build a **balanced tree** automatically from an array
- ✅ Handle **insertions and deletions** while preserving BST rules
- ✅ **Traverse** the tree in multiple orders
- ✅ **Rebalance** the tree
- ✅ Includes a **prettyPrint()** helper to visualize the structure

## 📚 Concepts Reinforced

- Recursion and base cases
- Reference vs value in JavaScript
- Queue-based traversal algorithms
- Balanced tree construction
- Divide and conquer logic

## 🧑‍💻 Author

**Marcos Curbeco**

[The Odin Project Student](https://www.theodinproject.com/dashboard) | Web Developer in Progress
