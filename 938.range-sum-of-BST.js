// 938. Range Sum of BST
// Given the root node of a binary search tree and two integers low and high, return the sum of values of all nodes with a value in the inclusive range [low, high].


// Solution 1: Recursive DFS

// Recursively dfs through the tree.
// If the node's value is within the range of [low, high], add the value to the sum.

// Time Complexity: O(n) 220ms
// Space Complexity: O(n) 69.3MB
var rangeSumBST = function(root, low, high) {
  let sum = 0;
  dfs(root);
  return sum;

  function dfs(node) {
    if (!node) return;
    if (node.val >= low && node.val <= high) sum += node.val;
    dfs(node.left);
    dfs(node.right);
  }   
};

// Solution 2: Iterative DFS

// Use a stack instead of recursion. 

// Time Complexity: O(n) 208ms
// Space Complexity: O(n) 65.7MB
var rangeSumBST = function(root, low, high) {
  let stack = [root], sum = 0;
  while (stack.length) {
    let node = stack.pop();
    if (node.val >= low && node.val <= high) sum += node.val;
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  return sum;
};