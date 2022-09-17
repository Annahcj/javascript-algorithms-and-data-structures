// 623. Add One Row to Tree
// Given the root of a binary tree and two integers val and depth, add a row of nodes with value val at the given depth depth.
// Note that the root node is at depth 1.
// The adding rule is:
  // Given the integer depth, for each not null tree node cur at the depth depth - 1, create two tree nodes with value val as cur's left subtree root and right subtree root.
  // cur's original left subtree should be the left subtree of the new left subtree root.
  // cur's original right subtree should be the right subtree of the new right subtree root.
  // If depth == 1 that means there is no depth depth - 1 at all, then create a tree node with value val as the new root of the whole original tree, and the original tree is the new root's left subtree.


// Solution 1: Recursive DFS

// Use recursive DFS to traverse the tree. Keep track of the current level.
// When the level is equal to depth - 1, we add the new nodes according to the instructions.
// Add a dummy root node (with original tree as the left child) to cover the case when depth is 1.

// n = number of nodes, h = height of the tree
// Time Complexity: O(n) 159ms
// Space Complexity: O(h) 48MB
var addOneRow = function(root, val, depth) {
  let dummyRoot = new TreeNode(null);
  dummyRoot.left = root;
  dfs(dummyRoot, 0);
  return dummyRoot.left;
  
  function dfs(node, lvl) {
    if (!node) return;
    if (lvl === depth - 1) {
      let left = node.left, right = node.right;
      node.left = new TreeNode(val);
      node.right = new TreeNode(val);
      
      node.left.left = left;
      node.right.right = right;
    } else {
      dfs(node.left, lvl + 1);
      dfs(node.right, lvl + 1);
    }
  }
};

// Solution 2: Iterative DFS

// Iterative DFS using a stack.

// n = number of nodes, h = height of the tree
// Time Complexity: O(n) 150ms
// Space Complexity: O(h) 49.6MB
var addOneRow = function(root, val, depth) {
  let dummyRoot = new TreeNode(null);
  dummyRoot.left = root;
  let stack = [[dummyRoot, 0]];
  while (stack.length) {
    let [node, lvl] = stack.pop();
    if (lvl === depth - 1) {
      let left = node.left, right = node.right;
      node.left = new TreeNode(val);
      node.right = new TreeNode(val);
      
      node.left.left = left;
      node.right.right = right;
    } else {
      if (node.left) stack.push([node.left, lvl + 1]);
      if (node.right) stack.push([node.right, lvl + 1]);
    }
  }
  return dummyRoot.left;
};