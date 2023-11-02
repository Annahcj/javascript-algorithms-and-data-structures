// 663. Equal Tree Partition
// Given the root of a binary tree, return true if you can partition the tree into two trees with equal sums of values after removing exactly one edge on the original tree.


// Solution: DFS Recursively

// Initiate a new hashmap seen 
// Call getSum for root (sum of the entire tree), store it in totalSum
// Decrement seen[totalSum] by one (can't check for itself)
// If seen[totalSum / 2] is bigger than 0, return true, otherwise false.

// getSum: (node)
  // base case: if node is invalid (null), return 0.
  // let sum be getSum(node.left) + getSum(node.right) + node.val
  // if seen doesn't contain sum, set seen[sum] to 1, otherwise increment seen[sum] by 1.
  // return sum

// Time Complexity: O(n) 108ms
// Space Complexity: O(n) 48.8MB
var checkEqualTree = function(root) {
  let seen = {};
  let totalSum = getSum(root);
  seen[totalSum]--;
  return seen[totalSum / 2] > 0;
  function getSum(node) {
    if (!node) return 0;
    let sum = getSum(node.left) + getSum(node.right) + node.val;
    seen[sum] = (seen[sum] || 0) + 1;
    return sum; 
  }
};