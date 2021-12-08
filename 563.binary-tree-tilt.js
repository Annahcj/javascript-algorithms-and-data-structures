// 563. Binary Tree Tilt
// Given the root of a binary tree, return the sum of every tree node's tilt.
// The tilt of a tree node is the absolute difference between the sum of all left subtree node values and all right subtree node values. If a node does not have a left child, then the sum of the left subtree node values is treated as 0. The rule is similar if there the node does not have a right child.


// LeetCode provided TreeNode
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

// generates a binary tree from an array (TESTING PURPOSES ONLY!)
function makeTree(arr) {
  if (!arr.length) return null;
  let root = new TreeNode(arr.shift());
  let queue = [root];
  while (queue.length) {
    let node = queue.shift();
    let left = arr.shift();
    let right = arr.shift();
    if (left) {
      node.left = new TreeNode(left);
      queue.push(node.left);
    }
    if (right) {
      node.right = new TreeNode(right);
      queue.push(node.right);
    }
  }
  return root;
}

// Solution: Recursive DFS

// Use recursive dfs to traverse the tree.
// Keep track of a tiltSum.
// For each node, add the absolute difference between the sum of the left subtree and the sum of the right subtree to tiltSum.

// n = number of nodes, h = height of tree.
// Time Complexity: O(n) 109ms
// Space Complexity: O(h) 43.5MB
var findTilt = function(root) {
  let tiltSum = 0;
  dfs(root);
  return tiltSum;

  function dfs(node) {
    if (!node) return 0;
    let leftSum = dfs(node.left);
    let rightSum = dfs(node.right);
    tiltSum += Math.abs(leftSum - rightSum);
    return leftSum + rightSum + node.val;
  }  
};

// Three test cases to run function on
console.log(findTilt(makeTree([1,2,3]))) // 1
console.log(findTilt(makeTree([4,2,9,3,5,null,7]))) // 15
console.log(findTilt(makeTree([21,7,14,1,1,2,2,3,3]))) // 9