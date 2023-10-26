// 124. Binary Tree Maximum Path Sum
// A path in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.
// The path sum of a path is the sum of the node's values in the path.
// Given the root of a binary tree, return the maximum path sum of any path.


// LeetCode provided TreeNode
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

// Solution: Recursive DFS

// logic:
// There are four possible situations for the max path sum for any position in the tree
// 1. The node itself
// 2. The max path sum for node's left child + node 
// 3. The max path sum for node's right child + node
// 4. Max left + max right + node 


// recurse: node
  // If node is invalid (null) return 0
  // Let leftMax be recurse(node.left) 
  // Let rightMax be recurse(node.right)
  // Let childMax be the bigger sum out of leftMax, rightMax (best path out of node.left or node.right)
  // Let oneMax equal max(node.val, node.val + childMax) (best path including node itself)
  // Let allMax equal max(oneMax, leftMax + rightMax + node.val) (best path at this spot)
  // update max if allMax is bigger than max
  // return oneMax

// Time Complexity: O(n) 138ms
// Space Complexity: O(n) 48.1MB
var maxPathSum = function(root) {
  let max = -Infinity;
  recurse(root);
  return max;
  function recurse(node) {
    if (!node) return 0;
    let leftMax = recurse(node.left);
    let rightMax = recurse(node.right);
    let childMax = Math.max(leftMax, rightMax);
    let oneMax = Math.max(node.val, node.val + childMax);
    let allMax = Math.max(oneMax, leftMax + rightMax + node.val);
    max = Math.max(max, allMax);
    return oneMax;
  }  
};

// Two test cases to run function on
console.log(maxPathSum(new TreeNode(1, new TreeNode(2), new TreeNode(3)))) // 6
console.log(maxPathSum(new TreeNode(-10, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7))))) // 42