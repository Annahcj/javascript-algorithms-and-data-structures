// 226. Invert Binary Tree
// Given the root of a binary tree, invert the tree, and return its root.

// LeetCode provided TreeNode
function TreeNode(val, left, right) {
   this.val = (val===undefined ? 0 : val)
   this.left = (left===undefined ? null : left)
   this.right = (right===undefined ? null : right)
}


// Solution: Iterative DFS

// Use a stack to store nodes, starting with root.
// Loop while the stack is not empty
  // node = stack.pop()
  // if node is invalid (null), continue
  // otherwise, if node has a left child or node has a right child
    // set temp to left child
    // set left child to right child
    // set right child to temp
    // push left child into stack
    // push right child into stack
// Return root

// Time Complexity: O(n) 72ms
// Space Complexity: O(n) 39.9MB
var invertTree = function(root) {
  let stack = [root];
  while (stack.length) {
    let node = stack.pop();
    if (!node) continue;
    if (node.left || node.right) {
      let temp = node.left;
      node.left = node.right;
      node.right = temp;
      stack.push(node.left);
      stack.push(node.right);
    }
  }  
  return root;
};

// Three test cases to run function on
console.log(invertTree(new TreeNode(2, new TreeNode(1), null))) // [2,null,1]
console.log(invertTree()) // []
console.log(invertTree(new TreeNode(2, new TreeNode(1), new TreeNode(3)))) // [2,3,1]