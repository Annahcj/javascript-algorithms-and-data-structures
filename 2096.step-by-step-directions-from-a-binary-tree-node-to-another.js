// 2096. Step-By-Step Directions From a Binary Tree Node to Another
// You are given the root of a binary tree with n nodes. Each node is uniquely assigned a value from 1 to n. You are also given an integer startValue representing the value of the start node s, and a different integer destValue representing the value of the destination node t.
// Find the shortest path starting from node s and ending at node t. Generate step-by-step directions of such path as a string consisting of only the uppercase letters 'L', 'R', and 'U'. Each letter indicates a specific direction:
  // 'L' means to go from a node to its left child node.
  // 'R' means to go from a node to its right child node.
  // 'U' means to go from a node to its parent node.
// Return the step-by-step directions of the shortest path from node s to node t.

// LeetCode provided TreeNode
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

// Creates a binary tree out of an array - according to leetcode's order (testing purposes only!)
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

// Solution: Map Parents w/ DFS

// 1. Build a parent map using dfs: { child: parent, child: parent, child: parent, ... }
  // In addition to populating the parent map, also save the node that has a value of startValue.
// 2. dfs from the startNode to find the first path that gets to a node with the destValue.

// n = number of nodes in root
// Time Complexity: O(n) 675ms
// Space Complexity: O(n) 
var getDirections = function(root, startValue, destValue) {
  let parent = {}, startNode;
  dfs(root); // populate the parent map
  let res, found = false;
  let visited = new Set(); // don't visit a node more than once
  findPath(startNode, '');
  return res;

  function findPath(node, path) {
    visited.add(node.val); // mark as visited
    if (node.val === destValue) { // if we have reached the destination node, set res to path and set found to true
      res = path;
      found = true;
    }
    if (!found) { // only if we haven't already found a path.
      if (node.left && !visited.has(node.left.val)) { // if we haven't visited the left child, visit the left child
        findPath(node.left, path + 'L');
      }
      if (node.right && !visited.has(node.right.val)) { // if we haven't visited the right child, visit the right child
        findPath(node.right, path + 'R');
      }
      if (parent[node.val] !== undefined && !visited.has(parent[node.val].val)) { // if we haven't visited the parent node, visit the parent node
        findPath(parent[node.val], path + 'U');
      }
    }
  }

  function dfs(node) {
    if (node && node.val === startValue) startNode = node; // save the start node
    if (node.left) { // save the parent of the left child
      parent[node.left.val] = node;
      dfs(node.left);
    }
    if (node.right) { // save the parent of the right child
      parent[node.right.val] = node;
      dfs(node.right);
    } 
  }  
};

// Two test cases to run function on
console.log(getDirections(makeTree([5,1,2,3,null,6,4]), 3, 6)) // "UURL"
console.log(getDirections(makeTree([2,1]), 2, 1)) // "L"