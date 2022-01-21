// 894. All Possible Full Binary Trees
// Given an integer n, return a list of all possible full binary trees with n nodes. Each node of each tree in the answer must have Node.val == 0.
// Each element of the answer is the root node of one possible tree. You may return the final list of trees in any order.
// A full binary tree is a binary tree where each node has exactly 0 or 2 children.

// LeetCode provided TreeNode
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

// Solution 1: Recursion

// Work from the bottom nodes up.

// For a binary tree to be full, the number of nodes must be odd: A root node, and all the rest must be even.

// If n is 5, these are the different combinations we have: 
  // left: 1 node, right: 3 nodes
  // left: 3 nodes, right: 1 node

// If n is 7:
  // left: 1 node, right: 5 nodes
  // left: 3 nodes, right: 3 nodes
  // left: 5 nodes, right: 1 node
// And for a tree 5 nodes, there are two different combinations of the 5 nodes. We must include all of them.

// Time Complexity: O(n * 2^n) 132ms
// Space Complexity: O(2^n) 51.4MB
var allPossibleFBT = function(n) {
  return recurse(n);
  
  function recurse(n) {
    if (n === 0 || n % 2 === 0) return [];
    if (n === 1) return [new TreeNode(0)];
    let res = [];
    n--; // current root node we will be adding
    for (var i = 1; i < n; i+=2) { // we jump by 2 since each tree must have an odd number of nodes
      let left = recurse(i), right = recurse(n - i); // i nodes on leftsubtree, n - i nodes on right subtree

      // try each combination of left subtree (with i nodes), and right subtree (with n - i nodes)
      for (var l of left) { 
        for (var r of right) {
          let node = new TreeNode(0); // new root
          node.left = l;
          node.right = r;
          res.push(node);
        }
      }
    }
    return res;
  }
};

// Solution 2: Recursion w/ Memoization

// The same as solution 1, except we memoize the results.

// Time Complexity: O(n * 2^n) 224ms
// Space Complexity: O(2^n) 48.9MB
var allPossibleFBT = function(n) {
  let memo = Array(n + 1);
  return recurse(n);

  function recurse(n) {
    if (n === 0 || n % 2 === 0) return [];
    if (n === 1) return [new TreeNode(0)];
    if (memo[n] !== undefined) return memo[n];
    let res = [];
    n -= 1;
    for (var i = 1; i < n; i+=2) {
      let left = recurse(i);
      let right = recurse(n - i);
      for (var l of left) {
        for (var r of right) {
          let node = new TreeNode(0);
          node.left = l;
          node.right = r;
          res.push(node);
        }
      }
    }
    return memo[n + 1] = res;
  }
};

// Two test cases to run function on
console.log(allPossibleFBT(3)) // [[0,0,0,null,null,0,0,null,null,0,0],[0,0,0,null,null,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,null,null,null,null,0,0],[0,0,0,0,0,null,null,0,0]]
console.log(allPossibleFBT(5)) // [[0,0,0]]