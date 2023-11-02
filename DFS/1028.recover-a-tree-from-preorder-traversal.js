// 1028. Recover a Tree From Preorder Traversal
// We run a preorder depth-first search (DFS) on the root of a binary tree.
// At each node in this traversal, we output D dashes (where D is the depth of this node), then we output the value of this node.  If the depth of a node is D, the depth of its immediate child is D + 1.  The depth of the root node is 0.
// If a node has only one child, that child is guaranteed to be the left child.
// Given the output traversal of this traversal, recover the tree and return its root.


// Solution: Iterative DFS

// Iteratively DFS using a stack to contain the nodes.
// Start it off with getting the first root value and push the root node into the stack.

// Until reaching the end of traversal:
  // 1. Get the number of dashes (the level)
  // 2. Get the next value 
  // 3. Pop off the stack until there are 'level' number of nodes left (find the parent node).
  // 4. Create a new node and add as either left or right child of the top node in the stack.
    // If there is no left child, add it as the left child.
    // Otherwise, add it as the right child.
  // 5. Push the new node to the stack.

// Time Complexity: O(n) 77ms
// Space Complexity: O(n) 47.4MB
var recoverFromPreorder = function(traversal) {
  let i = 0, val = "";
  while (i < traversal.length && traversal[i] !== '-') val += traversal[i++];
  let root = new TreeNode(val);
  let stack = [root];
  
  while (i < traversal.length) {
    let lvl = 0;
    while (traversal[i] === '-') lvl++, i++;
    let val = "";
    while (i < traversal.length && traversal[i] !== '-') val += traversal[i++];
    
    while (stack.length > lvl) stack.pop();
    let node = stack[stack.length - 1];
    
    let newNode = new TreeNode(val);
    if (!node.left) node.left = newNode;
    else node.right = newNode;
    
    stack.push(newNode);
  }
  return root;
};