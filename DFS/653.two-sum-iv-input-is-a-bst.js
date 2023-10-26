// 653. Two Sum IV - Input is a BST
// Given the root of a Binary Search Tree and a target number k, return true if there exist two elements in the BST such that their sum is equal to the given target.

// LeetCode provided TreeNode
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}
// Solution 1: Hashmap/Set w/ DFS Recursive

// keep a hashmap or a set of the values of nodes which we have been to
// dfs recursively

// let set be a new Set
// return dfs(root)
// dfs: (node)
  // If node is null, return false.
  // If set contains k - node.val, return true;
  // Add node.val to set
  // Return true if dfs(node.left) or dfs(node.right) returns true

// Time Complexity: O(n) 108ms 
// Space Complexity: O(n) 47.8MB
var findTarget = function(root, k) {
  let set = new Set();
  return dfs(root);
  function dfs(node) {
    if (!node) return false;
    if (set.has(k - node.val)) return true;
    set.add(node.val);
    return dfs(node.left) || dfs(node.right);
  }
};

// Solution 2: In-Order Traversal / Two Pointers

// Since the input is a BST, do an in-order traversal (left, push node.val, right) and put them in an array.
// Then, use the two-pointer technique to find a pair with the sum of k.

// inOrder: (node)
  // if node is null, return.
  // recursively call inOrder(node.left)
  // push node.val in arr
  // recursively call inOrder(node.right)

// two-pointer
// set two pointers l, r to the start and end of the arr
  // loop through arr,
    // sum = arr[l] + arr[r]
    // if sum is equal to k, return true.
    // if sum is bigger than k, decrement r
    // else, increment l
  // if no pair was found, return false.
  
// Time Complexity: O(n) 104ms
// Space Complexity: O(n) 48MB
var findTarget = function(root, k) {
  let arr = [];
  inOrder(root);
  function inOrder(node) {
    if (!node) return;
    inOrder(node.left);
    arr.push(node.val);
    inOrder(node.right);
  }
  let l = 0, r = arr.length - 1;
  while (l < r) {
    let sum = arr[l] + arr[r];
    if (sum === k) return true;
    if (sum > k) r--;
    else l++;
  }
  return false;
};


// Two test cases to run function on
console.log(findTarget(new TreeNode(5, new TreeNode(3, new TreeNode(2), new TreeNode(4)), new TreeNode(6, null, new TreeNode(7))), 9)) // true
console.log(findTarget(new TreeNode(5, new TreeNode(3, new TreeNode(2), new TreeNode(4)), new TreeNode(6, null, new TreeNode(7))), 28)) // false