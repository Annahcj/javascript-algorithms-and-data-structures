// 366. Find Leaves of Binary Tree
// Given the root of a binary tree, collect a tree's nodes as if you were doing this:
  // Collect all the leaf nodes.
  // Remove all the leaf nodes.
  // Repeat until the tree is empty.

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


// Solution: Keep Level of Nodes

// Dfs to all the leaf nodes, then work backwards. 

// If node is a leaf node, the level will be 0,
// the level for each node is the larger level out of the two children + 1.
// This works because a node always has to wait until all leaf nodes are removed
  // For e.g: if the left child has a level of 0 (leaf), and the right child has a level of 1 (one level after leaf), then we must take the level of the right child -> 1 + 1 = 2.

// Time Complexity: O(n) 68ms
// Space Complexity: O(n) 39.9MB
var findLeaves = function(root) {
  let res = [];
  dfs(root);
  return res;

  function dfs(node) {
    if (!node) return -1;
    let left = dfs(node.left);
    let right = dfs(node.right);
    let idx = Math.max(left, right) + 1; // larger level + 1
    if (!res[idx]) res[idx] = [];
    res[idx].push(node.val); // push into container at index 'idx'
    return idx; // return level of this node
  }
};

// Two test cases to run function on
console.log(findLeaves(makeTree([1,2,3,4,5]))) // [[4,5,3],[2],[1]]
console.log(findLeaves(makeTree([1]))) // [[1]]