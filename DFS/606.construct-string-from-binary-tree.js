// 606. Construct String from Binary Tree
// Given the root of a binary tree, construct a string consisting of parenthesis and integers from a binary tree with the preorder traversal way, and return it.
// Omit all the empty parenthesis pairs that do not affect the one-to-one mapping relationship between the string and the original binary tree.


// Solution: Recursive DFS

// There are three possible cases:
  // 1. No left and right child: return the node value by itself.
  // 2. Has left child and no right child: return the root value + the left subtree string in parentheses.
  // 3. Has both left and right child: return the root value + the left subtree string in parentheses + the right subtree string in parentheses.

// Time Complexity: O(n^2) 133ms
  // O(n^2) is caused by string concatenation
// Space Complexity: O(n) 46.8MB
var tree2str = function(root) {
  if (!root) return "";
  let left = tree2str(root.left), right = tree2str(root.right);
  if (!left && !right) return root.val.toString();
  if (!right) return `${root.val}(${left})`;
  return `${root.val}(${left})(${right})`;
};