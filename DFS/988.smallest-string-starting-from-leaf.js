// 988. Smallest String Starting From Leaf
// You are given the root of a binary tree where each node has a value in the range [0, 25] representing the letters 'a' to 'z'.
// Return the lexicographically smallest string that starts at a leaf of this tree and ends at the root.
// As a reminder, any shorter prefix of a string is lexicographically smaller.
  // For example, "ab" is lexicographically smaller than "aba".
// A leaf of a node is a node that has no children.


// Solution: DFS

// Use DFS to traverse all paths from the root to a leaf, while keeping track of the current string.
// Record and return the lexicographically smallest string.

// n = number of nodes in the tree
// Time Complexity: O(n^2) 67ms
// Space Complexity: O(n^2) 55.1MB
var smallestFromLeaf = function(root) {
  let res = "";
  dfs(root, "");
  return res;
  
  function dfs(node, str) {
    if (!node) return;
    str = String.fromCharCode(node.val + 97) + str;
    if (!node.left && !node.right) {
      res = res === "" || res.localeCompare(str) > 0 ? str : res;
      return;
    }
    dfs(node.left, str);
    dfs(node.right, str);
  }
};