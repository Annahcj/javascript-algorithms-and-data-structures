// 1008. Construct Binary Search Tree from Preorder Traversal
// Given an array of integers preorder, which represents the preorder traversal of a BST (i.e., binary search tree), construct the tree and return its root.
// It is guaranteed that there is always possible to find a binary search tree with the given requirements for the given test cases.
// A binary search tree is a binary tree where for every node, any descendant of Node.left has a value strictly less than Node.val, and any descendant of Node.right has a value strictly greater than Node.val.
// A preorder traversal of a binary tree displays the value of the node first, then traverses Node.left, then traverses Node.right.


// LeetCode provided TreeNode
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

// Solution 1: Naive Solution

// For each value in preorder, insert it into the root.

// insert:
// keep searching until we find a valid position for the value given.

// Time Complexity: O(n log(n)) 88ms
// Space Complexity: O(1) 40.8MB
var bstFromPreorder = function(preorder) {
  let root = new TreeNode(preorder[0]);
  for (var i = 1; i < preorder.length; i++) {
    insert(root, preorder[i]);
  }
  return root;

  function insert(root, val) {
    while (true) {
      if (val < root.val) {
        if (!root.left) {
          root.left = new TreeNode(val);
          return;
        } else root = root.left;
      } else {
        if (!root.right) {
          root.right = new TreeNode(val);
          return;
        } else root = root.right;
      }
    }
  }  
};

// Solution 2: Define Upper Bound

// Define an upper bound -> initially Infinity for the root node
// keep a pointer i for preorder
// return helper(Infinity)

// helper: (bound)
  // edge case: if i is out of bounds OR preorder[i] is bigger than bound, return null
  // create a new node with the value preorder[i]
  // increment i
  // set node.left to helper(node.val)
  // set node.right to helper(bound) 
  // return node

// n = preorder.length, h = height of tree
// Time Complexity: O(n) 80ms
// Space Complexity: O(h) 40.4MB
var bstFromPreorder = function(preorder) {
  let i = 0;
  return helper(Infinity);

  function helper(bound) {
    if (i === preorder.length || preorder[i] > bound) return null;
    let node = new TreeNode(preorder[i]);
    i++;
    node.left = helper(node.val); // set upper bound to node.val, since all values to the left must be smaller
    node.right = helper(bound); // same upper bound since we are going right
    return node;
  }  
};

// Two test cases to run function on
console.log(bstFromPreorder([8,5,1,7,10,12])) // [8,5,10,1,7,null,12]
console.log(bstFromPreorder([1,3])) // [1,null,3]