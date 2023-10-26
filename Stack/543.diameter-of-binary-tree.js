// 543. Diameter of Binary Tree
// Given the root of a binary tree, return the length of the diameter of the tree.
// The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.
// The length of a path between two nodes is represented by the number of edges between them.


// LeetCode provided TreeNode
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

// Solution 1: Recursive

// call dfs(root)
// return ans

// dfs:
  // Base case: If node is null, return 0.
  // Recurse node.left -> left
  // Recurse node.right -> right
  // update ans if a longest leaf-to-leaf path is found (left + right)
  // return the best path out of left and right  + 1

// Time Complexity: O(n) 80ms
// Space Complexity: O(n) (call stack) 42MB
var diameterOfBinaryTree = function(root) {
  let ans = 0;
  dfs(root);
  return ans;
  function dfs(node) {
    if (!node) return 0;
    let left = dfs(node.left);
    let right = dfs(node.right);
    // update answer if longer leaf-to-leaf path is found
    ans = Math.max(ans, left + right);
    // return the best path from this current node + 1
    return Math.max(left, right) + 1;
  }  
};

// Solution 2: Iterative

// Idea: We don't pop a node from the stack if the depths of the left and right child are not found yet

// Use a map to keep the depth of each node
// Use a stack to keep track of nodes to visit

// Loop while the stack is not empty
  // let node be the last node in the stack
  // if node has left child and left child doesn't have defined depth yet
    // push left child to stack
  // if node has a right child and right child doesn't have defined depth yet
    // push right child to stack
  // otherwise,
    // let last be stack.pop()
    // let left be the depth of last.left OR 0 if last doesn't have left child
    // let right be the depth of last.right OR 0 if last doesn't have right child
    // set depth of last to Math.max(left, right) + 1
    // update ans if left + right is bigger than it
// Return ans

// Time Complexity: O(n) 96ms
// Space Complexity: O(n) 43.8MB
var diameterOfBinaryTree = function(root) {
  let ans = 0;
  let stack = [root];
  let depths = new Map();
  while (stack.length) {
    let node = stack[stack.length - 1];
    if (node.left && !depths.has(node.left)) {
      stack.push(node.left);
    } else if (node.right && !depths.has(node.right)) {
      stack.push(node.right);
    } else {
      let last = stack.pop();
      let left = depths.has(last.left) ? depths.get(last.left) : 0;
      let right = depths.has(last.right) ? depths.get(last.right) : 0;
      let max = Math.max(left, right) + 1;
      depths.set(last, max);
      ans = Math.max(ans, left + right);
    }
  }
  return ans;
};

// Two test cases to run function on
console.log(diameterOfBinaryTree(new TreeNode(1, new TreeNode(2, new TreeNode(4), new TreeNode(5)), new TreeNode(3)))) // 3
console.log(diameterOfBinaryTree(new TreeNode(1, new TreeNode(2)))) // 1