// 501. Find Mode in Binary Search Tree
// Given the root of a binary search tree (BST) with duplicates, return all the mode(s) (i.e., the most frequently occurred element) in it.
// If the tree has more than one mode, return them in any order.
// Assume a BST is defined as follows:
  // The left subtree of a node contains only nodes with keys less than or equal to the node's key.
  // The right subtree of a node contains only nodes with keys greater than or equal to the node's key.
  // Both the left and right subtrees must also be binary search trees.


// Solution: In-Order DFS

// To make use of the fact that the tree is a BST, we can use in-order traversal to go through each node in sorted order.
// Keep track of the following:
  // 1. Count of occurances of the current node's value
  // 2. The value of the previously visited node (to know whether to reset the count or not)
  // 3. The maximum count of occurances seen so far
  // 4. An array of node values with the current maximum count

// As we visit each node, compare the current count with the maximum count: 
  // If the current count is greater, replace the maximum count and array of node values.
  // If the count is the same, add the current node value to the array.

// Time Complexity: O(n) 67ms
// Space Complexity: O(n) 48.2MB
var findMode = function(root) {
  let prevValue = null, currCount = 0;
  let maxCount = 0, maxValues = [];
  inorder(root);
  return maxValues;
  
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    
    if (node.val !== prevValue) {
      prevValue = node.val;
      currCount = 1;
    } else {
      currCount++;
    }
    if (currCount > maxCount) {
      maxCount = currCount;
      maxValues = [node.val];
    } else if (currCount === maxCount) {
      maxValues.push(node.val);
    }

    inorder(node.right);
  }  
};