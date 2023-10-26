// 314. Binary Tree Vertical Order Traversal
// Given the root of a binary tree, return the vertical order traversal of its nodes' values. (i.e., from top to bottom, column by column).
// If two nodes are in the same row and column, the order should be from left to right.

// LeetCode provided TreeNode
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

// Solution: DFS w/ Sorting

// For every node, define its width (horizontal) and its depth (vertical)

  // When going to a left child
    // width - 1
    // depth + 1

  // right child
    // width + 1
    // depth + 1

// Keep track of the minimum and maximum width of the tree

// When dfs is finished,
// loop through from minWidth to maxWidth
  // sort each group of nodes by their depth
  // push the group of nodes into res (result)
// Return res 

// w = width of tree, h = height/depth of tree
// Time Complexity: O(w * h log(h)) 76ms
// Space Complexity: O(n) 40.4MB
var verticalOrder = function(root) {
  if (!root) return [];
  let map = {};
  let minWidth = Infinity, maxWidth = -Infinity;
  dfs(root, 0, 0);

  function dfs(node, width, depth) {
    if (!map[width]) map[width] = [];
    map[width].push([node.val, depth]);
    minWidth = Math.min(minWidth, width);
    maxWidth = Math.max(maxWidth, width);
    if (node.left) dfs(node.left, width - 1, depth + 1);
    if (node.right) dfs(node.right, width + 1, depth + 1);
  }

  let res = [];
  for (var i = minWidth; i <= maxWidth; i++) {
    map[i].sort((a, b) => {
      return a[1] - b[1];
    });
    for (var j = 0; j < map[i].length; j++) {
      map[i][j] = map[i][j][0];
    }
    res.push(map[i]);
  }
  return res;
};

// A test case to run function on
console.log(verticalOrder(new TreeNode(3, new TreeNode(9, new TreeNode(4), new TreeNode(0)), new TreeNode(8, new TreeNode(1), new TreeNode(7))))) // [[4],[9],[3,0,1],[8],[7]]