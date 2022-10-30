// 2458. Height of Binary Tree After Subtree Removal Queries
// You are given the root of a binary tree with n nodes. Each node is assigned a unique value from 1 to n. You are also given an array queries of size m.
// You have to perform m independent queries on the tree where in the ith query you do the following:
  // Remove the subtree rooted at the node with the value queries[i] from the tree. It is guaranteed that queries[i] will not be equal to the value of the root.
// Return an array answer of size m where answer[i] is the height of the tree after performing the ith query.
// Note:
  // The queries are independent, so the tree returns to its initial state after each query.
  // The height of a tree is the number of edges in the longest simple path from the root to some node in the tree.


// Solution: Find Maximum Heights at Each Level

// For each level in the tree (distance from root), keep track of the two maximum heights of the subtrees on that level.

// 1. DFS to get the maximum height of every subtree.
// 2. DFS to get the levels of each node and the two maximum heights of subtrees at each level. 
  // (We keep track of two maximum heights so that we can fallback to the second height if the maximum height subtree is the one to remove)
// 3. Process each query.
  // Find the level of the node.
  // Find the maximum height of a different subtree at the same level.
  // The maximum height = level + max height of different subtree - 1

// n = number of nodes in the tree, m = number of queries
// Time Complexity: O(n + m) 768ms
// Space Complexity: O(n + m) 160.7MB
var treeQueries = function(root, queries) {
  let maxHeight = new Map();
  getMaxHeight(root);
  let levels = new Map(), levelMaxHeights = new Map(); // {level: {max, secondMax}, level: {max, secondMax}, ...}
  dfs(root, 0);
  
  let m = queries.length, ans = Array(m);
  for (let i = 0; i < m; i++) {
    let nodeValue = queries[i], level = levels.get(nodeValue);
    let {max, secondMax} = levelMaxHeights.get(level);
    if (max !== nodeValue) {
      ans[i] = level + maxHeight.get(max) - 1;
    } else if (secondMax !== -1 && secondMax !== nodeValue) {
      ans[i] = level + maxHeight.get(secondMax) - 1;
    } else {
      ans[i] = level - 1; 
    }
  }
  return ans;
  
  function getMaxHeight(node) {
    if (!node) return 0;
    let leftMaxHeight = getMaxHeight(node.left);
    let rightMaxHeight = getMaxHeight(node.right);
    let height = Math.max(leftMaxHeight, rightMaxHeight) + 1;
    maxHeight.set(node.val, height);
    return height;
  }
  
  function dfs(node, level) { // find level of each node and two maximum subtree heights for each level
    if (!node) return;
    let height = maxHeight.get(node.val);
    if (!levelMaxHeights.has(level)) levelMaxHeights.set(level, {max: -1, secondMax: -1});
    let {max, secondMax} = levelMaxHeights.get(level);
    if (max === -1 || height > maxHeight.get(max)) {
      secondMax = max;
      max = node.val;
    } else if (secondMax === -1 || height > maxHeight.get(secondMax)) {
      secondMax = node.val;
    }
    levelMaxHeights.set(level, {max, secondMax});
    levels.set(node.val, level);
    dfs(node.left, level + 1);
    dfs(node.right, level + 1);
  }
};