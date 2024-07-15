// 2196. Create Binary Tree From Descriptions
// You are given a 2D integer array descriptions where descriptions[i] = [parenti, childi, isLefti] indicates that parenti is the parent of childi in a binary tree of unique values. Furthermore,
  // If isLefti == 1, then childi is the left child of parenti.
  // If isLefti == 0, then childi is the right child of parenti.
// Construct the binary tree described by descriptions and return its root.
// The test cases will be generated such that the binary tree is valid.


// Solution: Hashmap & Set

// Since nodes can appear multiple times in descriptions (as a parent or as a child), we only create a new node the first time we see it.
// After the first encounter, we should store the node in a hashmap to reference later.
// Use a hashset to store nodes who have a parent.
// At the end, only the root will not have a parent node, so we return the tree rooted at that node.

// n = length of descriptions
// Time Complexity: O(n) 358ms
// Space Complexity: O(n) 74.3MB
function createBinaryTree(descriptions) {
  let nodes = {}, hasParent = new Set();
  for (let [parent, child, isLeft] of descriptions) {
    let parentNode = nodes[parent] ?? new TreeNode(parent);
    nodes[parent] = parentNode;
    
    let childNode = nodes[child] ?? new TreeNode(child);
    nodes[child] = childNode;
    if (isLeft) {
      parentNode.left = childNode;
    } else {
      parentNode.right = childNode;
    }
    hasParent.add(child);
  }
  for (let [parent] of descriptions) {
    // node with no parent is the root
    if (!hasParent.has(parent)) {
      return nodes[parent];
    }
  }
};