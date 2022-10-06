// 988. Smallest String Starting From Leaf
// You are given the root of a binary tree where each node has a value in the range [0, 25] representing the letters 'a' to 'z'.
// Return the lexicographically smallest string that starts at a leaf of this tree and ends at the root.
// As a reminder, any shorter prefix of a string is lexicographically smaller.
  // For example, "ab" is lexicographically smaller than "aba".
// A leaf of a node is a node that has no children.


// Solution: DFS

// Recursively DFS from root, keep track of the current string.
// When we reach a leaf node, reverse the string and compare it against the current lexicographically smallest string.

// Time Complexity: O(n^2) 170ms
  // O(n^2) because appending to a string costs O(n)
// Space Complexity: O(n) 50.4MB
var smallestFromLeaf = function(root) {
  let res = null;
  dfs(root, "");
  return res;
  
  function dfs(node, str) {
    str += String.fromCharCode(node.val + 97);
    if (!node.left && !node.right) {
      res = smaller(res, str.split("").reverse().join(""));
      return;
    }
    if (node.left) dfs(node.left, str);
    if (node.right) dfs(node.right, str);
  }
};

function smaller(a, b) {
  if (a === null) return b;
  return a.localeCompare(b) <= 0 ? a : b;
}