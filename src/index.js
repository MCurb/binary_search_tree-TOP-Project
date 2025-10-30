import { Tree } from './binary-search-tree';

const tree = new Tree();

//Creating balanced Binary Search Tree
tree.buildTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67]);
tree.prettyPrint(tree.root);
console.log('Is the tree balanced?', tree.isBalanced());

//Traverse the tree with different algorithms
console.log('Tree Traversals:');
console.log('Level Order Traversal');
tree.levelOrderForEachRecursive((node) => console.log(node.value));

console.log('Preorder Traversal');
tree.preOrderForEach((node) => console.log(node.value));

console.log('Inorder Traversal');
tree.inOrderForEach((node) => console.log(node.value));

console.log('Postorder Traversal');
tree.postOrderForEach((node) => console.log(node.value));

//Modify Tree
console.log('Adding and deleting nodes to unbalance tree:');
tree.insert(148);
tree.insert(148);
tree.insert(2);
tree.insert(6);
tree.insert(11651);
tree.insert(35655);
tree.deleteItem(67);

tree.prettyPrint(tree.root);
console.log('Is the tree balanced?', tree.isBalanced());

//Rebalance Tree
console.log('Rebalancing Tree...');
tree.rebalance();
tree.prettyPrint(tree.root);
console.log('Is the tree balanced?', tree.isBalanced());

//Trying different Tree methods
console.log('Trying more Tree methods:');
console.log('Find node with value 23:', tree.find(23));
console.log('The height of value 3 is', tree.height(3));
console.log('The depth of value 148 is', tree.depth(148));
