// 559. Maximum Depth of N-ary Tree
// Given a n-ary tree, find its maximum depth.
// The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.
// Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value (See examples).


// Solution: Recursive DFS

// special base case: if root is undefined (not a node) return 0 (this is only necessary for an empty tree)
// if root is a leaf node, return 1.
// recurse every child node of root and find the max depth
// return max + 1 for earlier calls

// Time Complexity: O(n) 80ms
// Space Complexity: O(n) 41.6MB
var maxDepth = function(root) {
  if (!root) return 0;
  if (!root.children.length) return 1;
  let max = 0;
  for (var node of root.children) {
    max = Math.max(max, maxDepth(node));
  }
  return max + 1;
};