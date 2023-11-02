// 257. Binary Tree Paths
// Given the root of a binary tree, return all root-to-leaf paths in any order.
// A leaf is a node with no children.


// Solution: Recursive DFS w/ Backtracking

// Use recursive DFS with backtracking to find all root-to-leaf paths. 

// n = number of nodes
// Time Complexity: O(n^2) 56ms
// Space Complexity: O(n^2) 43MB
var binaryTreePaths = function(root) {
  let paths = [];
  dfs(root, [root.val]);
  return paths;
  
  function dfs(node, path) {
    if (!node.left && !node.right) {
      paths.push(path.join("->"));
      return;
    }
    if (node.left) {
      path.push(node.left.val);
      dfs(node.left, path);
      path.pop();
    }
    if (node.right) {
      path.push(node.right.val);
      dfs(node.right, path);
      path.pop();
    }
  }  
};