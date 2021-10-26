// 572. Subtree of Another Tree
// Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.


// Solution: Recursive DFS

// Time Complexity: O(n) 120ms
// Space Complexity: O(n) 45.9MB
var isSubtree = function(root, subRoot) {
  if (!root) return false;
  if (isSame(root, subRoot)) return true;
  // check if left child matches subRoot OR right child matches subRoot
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
};
function isSame(tree1, tree2) {
  // if both are null, return true since they are equal
  if (!tree1 && !tree2) return true;
  // if either one is null, return false
  if (!tree1 || !tree2) return false;
  // if values are not equal, return false
  if (tree1.val !== tree2.val) return false;
  // both subtrees must be equal
  return isSame(tree1.left, tree2.left) && isSame(tree1.right && tree2.right);
}