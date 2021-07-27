// 108. Convert Sorted Array to Binary Search Tree
// Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.
// A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.

// TreeNode provided by LeetCode
  function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
  }
  
  // Solution 1: Recursion
  
  // Thoughts:
  // If we use recursion, we would be building up the tree from bottom up.
  
  // Algorithm:
  // Create a helper function which accepts start and end indexes (instead of slicing parts of nums)
  // helper:
  // If start is bigger than end, return null.
  // Calculate midpoint -> Math.floor((start + end) / 2)
  // Create a new node with the val of nums[mid]
  // recursively call helper(start, mid - 1) for newNode's left child (going all the way until start > end)
  // recursively call helper(mid + 1, end) for newNode's right child (going all the way until start > end)
  // Return node. (tree would now be fully made)
  
  // Time Complexity: O(n) 92ms
  // Space Complexity: O(n) 41.3MB
  var sortedArrayToBST = function(nums) {
    return helper(0, nums.length - 1);
    function helper(start, end) {
      if (start > end) return null;
      let mid = Math.floor((start + end) / 2);
      let node = new TreeNode(nums[mid]);
      node.left = helper(start, mid - 1);
      node.right = helper(mid + 1, end);
      return node;
    }
  };
  
  // Two test cases to run function on
  console.log(sortedArrayToBST([-10,-3,0,5,9])) // [0,-3,9,-10,null,5]
  console.log(sortedArrayToBST([1,3])) // [3,1]