// 230. Kth Smallest Element in a BST
// Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.


// Solution 1: Recursive In-Order Traversal

// Do an in-order traversal -> left, middle, right
// push these nodes into an arr
// return the k-1th element in the array

// n = number of nodes in tree
// Time Complexity: O(n) 97ms
// Space Complexity: O(n) 44.8MB
var kthSmallest = function(root, k) {
  let arr = [];
  dfs(root);
  return arr[k - 1];

  function dfs(node) {
    if (node.left) dfs(node.left);
    arr.push(node.val);
    if (node.right) dfs(node.right);
  }  
}

// Solution 2: Iterative In-Order Traversal

// Instead of looping through the whole tree and storing the results in an array, we can terminate the process when we find the kth node.

// h = height of tree
// Time Complexity: O(h + k) 76ms
// Space Complexity: O(h) 44.4MB
var kthSmallest = function(root, k) {
  let stack = [root];
  while (true) {
    // go as far left as possible
    while (root) {
      stack.push(root);
      root = root.left;
    }
    // take out the last item in stack
    root = stack.pop();
    // decrement k
    k--;
    // if k is 0 (we are at the kth smallest element), return value of root
    if (k === 0) return root.val;
    // otherwise go to right child
    root = root.right;
  }
}