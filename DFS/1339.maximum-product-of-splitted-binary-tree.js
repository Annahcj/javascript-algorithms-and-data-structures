// 1339. Maximum Product of Splitted Binary Tree
// Given the root of a binary tree, split the binary tree into two subtrees by removing one edge such that the product of the sums of the subtrees is maximized.
// Return the maximum product of the sums of the two subtrees. Since the answer may be too large, return it modulo 109 + 7.
// Note that you need to maximize the answer before taking the mod and not after taking it.

// LeetCode provided TreeNode
  function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
   }
   
   
// Solution: Two-Pass DFS

// Using recursive dfs, calculate the sum of the nodes in root.
// Recursively dfs again, calculating the sum of the subtrees and calculating the maximum product along the way.

// Algorithm:
// ans = 0 (maximum product), totalSum = 0 (sum of the values of all nodes) 
// dfs: (node)
  // Base case: If node is undefined, return 0.
  // leftSum equals dfs(node.left) 
  // rightSum equals dfs(node.right)
  // Let currSum equal node.val + leftSum + rightSum
  // (for second call) update ans if product of two subtrees if bigger (currSum * (totalSum - currSum))
  // Return currSum
// update totalSum to dfs(root)
// Call dfs(root) to calculate maximum product.
// Return ans mod 1000000007.

// Time Complexity: O(n) 168ms
// Space Complexity: O(n) 63.9MB
var maxProduct = function(root) {
  let ans = 0, totalSum = 0;
  totalSum = dfs(root);
  dfs(root);
  return ans % 1000000007;
  
  function dfs(node) {
    if (!node) return 0;
    let leftSum = dfs(node.left);
    let rightSum = dfs(node.right);
    let currSum = node.val + leftSum + rightSum;
    ans = Math.max(ans, currSum * (totalSum - currSum));
    return currSum;
  }
};

// A test cases 
console.log(maxProduct(new TreeNode(1, null, new TreeNode(2, new TreeNode(3), new TreeNode(4, new TreeNode(5), new TreeNode(6)))))) // 90