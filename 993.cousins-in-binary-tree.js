// 993. Cousins in Binary Tree
// Given the root of a binary tree with unique values and the values of two different nodes of the tree x and y, return true if the nodes corresponding to the values x and y in the tree are cousins, or false otherwise.
// Two nodes of a binary tree are cousins if they have the same depth with different parents.
// Note that in a binary tree, the root node is at the depth 0, and children of each depth k node are at the depth k + 1.


// LeetCode provided TreeNode
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

// Solution: Recursive DFS

// Keep four variables -> 
// for x: xDepth, xParent
// for y: yDepth, yParent

// call function find(root, 0, null)
// if depth of x is equal to depth of y AND the parent of x is not equal to parent of y, return true.
// otherwise return false

// find: (node, depth, parent)
  // if node is x,
    // set xDepth to depth, xParent to parent, and return.
  // if node is y,
    // set yDepth to depth, yParent to parent, and return.
  // if node has left child, call find(node.left, depth + 1, node)
  // if node has right child, call find(node.right, depth + 1, node)



// Time Complexity: O(n) 68ms
// Space Complexity: O(n) (call stack) 40.7MB
var isCousins = function(root, x, y) {
  let xDepth, yDepth, xParent, yParent;
  find(root, 0, null);

  if (xDepth === yDepth && xParent !== yParent) return true;
  return false;

  function find(node, depth, parent) {
    if (node.val === x) {
      xDepth = depth;
      xParent = parent;
      return;
    } else if (node.val === y) {
      yDepth = depth;
      yParent = parent;
      return;
    }
    if (node.left) find(node.left, depth + 1, node);
    if (node.right) find(node.right, depth + 1, node);
  }  
};

// A test case to run function on
console.log(isCousins(new TreeNode(1, new TreeNode(2, new TreeNode(4)), new TreeNode(3)), 4, 3)) // false