// 1457. Pseudo-Palindromic Paths in a Binary Tree
// Given a binary tree where node values are digits from 1 to 9. A path in the binary tree is said to be pseudo-palindromic if at least one permutation of the node values in the path is a palindrome.
// Return the number of pseudo-palindromic paths going from the root node to leaf nodes.


// Solution 1: Recursive DFS w/ Bitmask

// All node values must have an even occurance
// and at most one node value with an odd occurance.

// Use a bitmask to keep track of whether the count of the ith digit is even or odd.
// Recursively DFS to traverse the tree.

// Time Complexity: O(n) 425ms
// Space Complexity: O(h) 115MB
var pseudoPalindromicPaths  = function(root) {
  let paths = 0;
  dfs(root, 0);
  return paths;
  
  function dfs(node, mask) {
    if (!node) return;
    mask ^= (1 << node.val); // flip the ith bit
    if (!node.left && !node.right) {
      if (isPseudoPalindrome(mask)) paths++;
      return;
    }
    dfs(node.left, mask);
    dfs(node.right, mask);
  }  
  
  function isPseudoPalindrome(mask) {
    let odd = 0;
    while (mask > 0) {
      odd += (mask & 1);
      mask >>= 1;
    }
    return odd < 2;
  }
};


// Solution 2: Iterative DFS w/ Bitmasks

// Instead of using recursion, we can use a stack to iteratively traverse the tree.

// Time Complexity: O(n) 519ms
// Space Complexity: O(h) 108.9MB
var pseudoPalindromicPaths  = function(root) {
  let paths = 0, stack = [[root, 0]];
  while (stack.length) {
    let [node, mask] = stack.pop();
    mask ^= (1 << node.val);
    if (!node.left && !node.right) {
      if (isPseudoPalindrome(mask)) paths++;
    }
    if (node.left) stack.push([node.left, mask]);
    if (node.right) stack.push([node.right, mask]);
  }
  return paths;
  
  function isPseudoPalindrome(mask) {
    let odd = 0;
    while (mask > 0) {
      odd += (mask & 1);
      mask >>= 1;
    }
    return odd < 2;
  }
};