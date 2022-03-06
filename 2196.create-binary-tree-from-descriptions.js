// 2196. Create Binary Tree From Descriptions
// You are given a 2D integer array descriptions where descriptions[i] = [parenti, childi, isLefti] indicates that parenti is the parent of childi in a binary tree of unique values. Furthermore,
  // If isLefti == 1, then childi is the left child of parenti.
  // If isLefti == 0, then childi is the right child of parenti.
// Construct the binary tree described by descriptions and return its root.
// The test cases will be generated such that the binary tree is valid.


// Solution: Map & Set

// Use a map 'nodes' to store the references to the tree nodes.
// Use a set 'children' to store the values of all children nodes. 
  // This is used to find the root, the root node is the only node that does not exist in the set.

// Time Complexity: O(n) 510ms
// Space Complexity: O(n) 88.8MB
var createBinaryTree = function(descriptions) {
  let nodes = new Map(), children = new Set();
  for (let [parent, child, isLeft] of descriptions) {
    let parentNode = nodes.get(parent) || new TreeNode(parent);
    if (!nodes.has(parent)) nodes.set(parent, parentNode);
    
    let childNode = nodes.get(child) || new TreeNode(child);
    if (!nodes.has(child)) nodes.set(child, childNode);
    
    if (isLeft) parentNode.left = childNode;
    else parentNode.right = childNode;
    
    children.add(child);
  }

  for (let [parent, child, isLeft] of descriptions) {
    // a node with no parent is the root
    if (!children.has(parent)) return nodes.get(parent);
  }
};