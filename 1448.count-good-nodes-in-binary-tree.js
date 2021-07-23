// 1448. Count Good Nodes in Binary Tree
// Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X.
// Return the number of good nodes in the binary tree.


// Solution 1: Pre-Order DFS Iteratively

// Initialize a stack with [root, root.val] (the second item is the biggest value from the root to current node)
// Loop while stack is not empty
  // Pop off stack, keeping variables for the current node and current max
  // If currMax (biggest node value from root to curr) is bigger than curr node's value, increment count by one (we found a good node!)
  // If curr node has a right node, push [curr.right, Math.max(current max, curr.right.val)] 
  // If curr node has a left node, push [curr.left, Math.max(current max, curr.left.val)]
// Return count

// Time Complexity: O(n) 160ms
// Space Complexity: O(log n) (length of stack) 59.4MB
var goodNodes = function(root) {
    let stack = [[root, root.val]], count = 0;
    while (stack.length) {
      let [curr, currMax] = stack.pop();
      if (currMax <= curr.val) count++;
      if (curr.right) stack.push([curr.right, Math.max(currMax, curr.right.val)]);
      if (curr.left) stack.push([curr.left, Math.max(currMax, curr.left.val)]);
    }
    return count;
  };