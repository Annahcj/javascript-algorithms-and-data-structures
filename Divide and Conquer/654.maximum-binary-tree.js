// 654. Maximum Binary Tree
// You are given an integer array nums with no duplicates. A maximum binary tree can be built recursively from nums using the following algorithm:
// 1. Create a root node whose value is the maximum value in nums.
// 2. Recursively build the left subtree on the subarray prefix to the left of the maximum value.
// 3. Recursively build the right subtree on the subarray suffix to the right of the maximum value.
// Return the maximum binary tree built from nums.

// LeetCode provided TreeNode
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
} 

// Solution: Divide & Conquer / Recursion

// constructMaximumBinaryTree: (nums, start index, end index)
  // base case: if start is bigger than or equal to end, return null.
  // Get the index of the biggest number from start to end -> maxIdx
  // Create a new node with the value of nums[maxIdx]
  // Set left child of newNode to constructMaximumBinaryTree(nums, start, maxIdx)
  // Set right child of newNode to constructMaximumBinaryTree(nums, maxIdx + 1, end)
  // Last, return newNode for earlier calls.

// Time Complexity: O(n^2) 116ms
// Space Complexity: O(n) 45.9MB
var constructMaximumBinaryTree = function(nums, start = 0, end = nums.length) {
  if (start >= end) return null;
  let maxIdx = start;
  for (var i = start + 1; i < end; i++) maxIdx = nums[i] > nums[maxIdx] ? i : maxIdx;
  let newNode = new TreeNode(nums[maxIdx]);
  newNode.left = constructMaximumBinaryTree(nums, start, maxIdx);
  newNode.right = constructMaximumBinaryTree(nums, maxIdx + 1, end);
  return newNode;
};

// A test case to run function on
console.log(constructMaximumBinaryTree([3,2,1,6,0,5])) // [6,3,5,null,2,0,null,null,1]