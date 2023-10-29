// 1305. All Elements in Two Binary Search Trees
// Given two binary search trees root1 and root2, return a list containing all the integers from both trees sorted in ascending order.


// Solution: Inorder Traversal & Merge 

// 1. Do inorder traversals for root1 and root2.
// 2. Use two pointers to merge the two arrays into one sorted array.

// n = number of nodes in root1, m = number of nodes in root2
// Time Complexity: O(n + m) 248ms
// Space Complexity: O(n + m) 57MB
var getAllElements = function(root1, root2) {
  let arr1 = [], arr2 = [];
  dfs(root1, arr1);
  dfs(root2, arr2);
  
  let i = 0, j = 0, res = [];
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) res.push(arr1[i++]);
    else res.push(arr2[j++]);
  }
  while (i < arr1.length) res.push(arr1[i++]);
  while (j < arr2.length) res.push(arr2[j++]);
  return res;
  
  function dfs(node, arr) {
    if (!node) return;
    dfs(node.left, arr);
    arr.push(node.val);
    dfs(node.right, arr);
  }
};