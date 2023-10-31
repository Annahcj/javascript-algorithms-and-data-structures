// 235. Lowest Common Ancestor of a Binary Search Tree
// Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.

// Leetcode-provided Treenode
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
// Function that constructs a binary search tree based on an array (for testing purposes only)
function makeTree(arr) {
  let tree = new TreeNode(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    let node = tree;
    while (true) {
      if (node.val > arr[i]) {
        if (!node.left) {
          node.left = new TreeNode(arr[i]);
          break;
        }
        else node = node.left;
      } else {
        if (!node.right) {
          node.right = new TreeNode(arr[i]);
          break;
        }
        else node = node.right;
      }
    }
  }
  return tree;
}


// Solution 1: Iteratively

// Thoughts:
// For any node in the BST, we can say that 
// if the value of the node is bigger than both nodes p and q, p and q will always be somewhere inside the left child of the node.
// if the value of the node is smaller than both nodes p and q, p and q will always be somewhere inside the right child of the node.
// otherwise, if the value of the node is somewhere in between p and q, we have found the lowest common ancestor!

// Pseudocode:
// Loop while root is valid, 
// if node val is bigger than p and q, set node to left child
// if node val is smaller than p and q, set node to right child
// else return node

// Time Complexity: O(n) 104ms
// Space Complexity: O(1) 49.1MB
var lowestCommonAncestor = function(root, p, q) {
  let pVal = p.val, qVal = q.val;
  while (root !== null) {
    if (root.val > pVal && root.val > qVal) root = root.left;
    else if (root.val < pVal && root.val < qVal) root = root.right;
    else return root;
  }
};


// Solution 2: Recursively

// We use the exact same logic as the iterative version, just that instead of using a while loop, we recursively call lowestCommonAncestor on either the left or right child, otherwise returning the node.

// Time Complexity: O(n) 100ms
// Space Complexity: O(n) (call stack) 49.2MB
var lowestCommonAncestor = function(root, p, q) {
  if (root.val > p.val && root.val > q.val) return lowestCommonAncestor(root.left, p, q);
  else if (root.val < p.val && root.val < q.val) return lowestCommonAncestor(root.right, p, q);
  else return root;
};

// Three test cases
console.log(lowestCommonAncestor(makeTree([2,1]), new TreeNode(2), new TreeNode(1))) // 2
console.log(lowestCommonAncestor(makeTree([6,2,8,0,4,7,9,null,null,3,5]), new TreeNode(2), new TreeNode(8))) // 6
console.log(lowestCommonAncestor(makeTree([6,2,8,0,4,7,9,null,null,3,5]), new TreeNode(2), new TreeNode(4))) // 2