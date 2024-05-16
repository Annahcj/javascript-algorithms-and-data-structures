// 2331. Evaluate Boolean Binary Tree
// You are given the root of a full binary tree with the following properties:
  // Leaf nodes have either the value 0 or 1, where 0 represents False and 1 represents True.
  // Non-leaf nodes have either the value 2 or 3, where 2 represents the boolean OR and 3 represents the boolean AND.
// The evaluation of a node is as follows:
  // If the node is a leaf node, the evaluation is the value of the node, i.e. True or False.
  // Otherwise, evaluate the node's two children and apply the boolean operation of its value with the children's evaluations.
// Return the boolean result of evaluating the root node.
// A full binary tree is a binary tree where each node has either 0 or 2 children.
// A leaf node is a node that has zero children.


// Solution: Post-Order DFS

// Use post-order DFS to get the evaluated result from each left and right subtree, and perform the operation on the values to return one result.

// n = number of nodes, h = height of tree
// Time Complexity: O(n) 67ms
// Space Complexity: O(h) 55.9MB
function evaluateTree(node) {
  if (!node.left && !node.right) return !!node.val;
  let leftResult = evaluateTree(node.left);
  let rightResult = evaluateTree(node.right);
  return node.val === 2 ? leftResult || rightResult : leftResult && rightResult;
};