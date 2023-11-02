// 2476. Closest Nodes Queries in a Binary Search Tree
// You are given the root of a binary search tree and an array queries of size n consisting of positive integers.
// Find a 2D array answer of size n where answer[i] = [min[i], max[i]]:
  // min[i] is the largest value in the tree that is smaller than or equal to queries[i]. If a such value does not exist, add -1 instead.
  // max[i] is the smallest value in the tree that is greater than or equal to queries[i]. If a such value does not exist, add -1 instead.
// Return the array answer.


// Solution: Inorder Traversal & Binary Search

// 1. Do an inorder traversal to get the node values in sorted order.
// 2. For each query, binary search through the array of values for:
  // a. The maximum value smaller than or equal to the query value
  // b. The minimum value bigger than or equal to the query value

// n = number of nodes, m = number of queries
// Time Complexity: O(m log(n)) 912ms
// Space Complexity: O(n) 142.MB
var closestNodes = function(root, queries) {
  let values = [], res = [];
  inorder(root);
  for (let value of queries) {
    res.push([getMaxSmaller(value), getMinBigger(value)]);
  }
  return res;
  
  function inorder(node) {
    if (!node) return;
    inorder(node.left);
    values.push(node.val);
    inorder(node.right);
  }
  
  function getMaxSmaller(value) { // binary search for maximum number <= value
    let low = 0, high = values.length - 1;
    while (low < high) {
      let mid = Math.ceil((low + high) / 2);
      if (values[mid] <= value) low = mid;
      else high = mid - 1;
    }
    return values[low] <= value ? values[low] : -1;
  }
  
  function getMinBigger(value) { // binary search for minimum number >= value
    let low = 0, high = values.length - 1;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (values[mid] >= value) high = mid;
      else low = mid + 1;
    }
    return values[low] >= value ? values[low] : -1;
  }
};