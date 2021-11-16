// 333. Largest BST Subtree
// Given the root of a binary tree, find the largest subtree, which is also a Binary Search Tree (BST), where the largest means subtree has the largest number of nodes.
// A Binary Search Tree (BST) is a tree in which all the nodes follow the below-mentioned properties:
  // The left subtree values are less than the value of their parent (root) node's value.
  // The right subtree values are greater than the value of their parent (root) node's value.
// Note: A subtree must include all of its descendants.


// LeetCode Provided TreeNode
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

// Function that creates a binary tree out of an array (TESTING PURPOSES ONLY!)
function makeTree(arr) { // note: this method only works when the array is in bfs order (level by level, top to bottom)
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

// Solution: DFS

// For each call, return [number of nodes in tree, smallest value in tree, largest value in tree]
// Note: if we encountered an invalid tree in a subtree, the min and max value will be set to -Infinity/Infinity.

// Base case: if node is null, return [0, Infinity, -Infinity] (0 nodes in tree, Infinity (so that it is a valid subtree), -Infinity (so that it is a valid subtree))

// Time Complexity: O(n) 80ms
// Space Complexity: O(n) 44.4MB
var largestBSTSubtree = function(root) {
  let max = 0;
  dfs(root);
  return max;

  function dfs(node) {
    if (!node) {
      return [0, Infinity, -Infinity];
    }
    let [left, leftMin, leftMax] = dfs(node.left);
    let [right, rightMin, rightMax] = dfs(node.right);
    if (leftMax < node.val && rightMin > node.val) { // if valid BST -> biggest node in left subtree is smaller than node, smallest node in right subtree is bigger than node
      max = Math.max(max, left + right + 1); // record maximum tree size
      return [left + right + 1, Math.min(leftMin, rightMin, node.val), Math.max(leftMax, rightMax, node.val)]; // return new values
    } else {
      return [left + right + 1, -Infinity, Infinity]; // otherwise, return invalid properties
    }
  }
};

// Three test cases to run function on
console.log(largestBSTSubtree(makeTree([3,2,4,null,null,1]))) // 2
console.log(largestBSTSubtree(makeTree([10,5,15,1,8,null,7]))) // 3
console.log(largestBSTSubtree(makeTree([4,2,7,2,3,5,null,2,null,null,null,null,null,1]))) // 2