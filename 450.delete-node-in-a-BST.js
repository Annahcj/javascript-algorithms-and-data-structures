// 450. Delete Node in a BST
// Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.
// Basically, the deletion can be divided into two stages:
  // 1. Search for a node to remove.
  // 2. If the node is found, delete the node.


// Solution: Iterative

// Find the node with a value equal to key.
// Here, we encounter 
  // 1. Node has no children, simply return null.
  // 2. Node has no left child, return the right child.
  // 3. Node has no right child, return the left child.
  // 4. Node has both children
    // We can make either the left child or the right child the new root.
    // For my solution, I have chosen the right child (both work)
    // When replacing the root with the right child, the right child's left child will not be in the right position.
    // Anything right of the node must be bigger, and we know that the right child's left child is bigger than the old root,
    // so we should find the right most node in the left subtree.
    // here are the steps down below
      // 1. Find the right most node in the left subtree.
      // 2. Set the right child of the right most node to the right child's left child (the entire subtree, not just the one node).
      // 3. Set the left child of the right child to be root's left child.
      // 4. Finally, replace the root with right child.
    // Note: We need a separate function to return the newly constructed tree because we need the parent reference.
    // So, instead of looking for the node with the key, look for a left/child right with the key, 
    // then just replace the left/right child with what is returned from the function.

// Time Complexity: O(h) 116ms
// Space Complexity: O(1) 47.8MB 
var deleteNode = function(root, key) {
  let node = root;
  // if the root is equal to key, replace node
  if (node && node.val === key) return replace(node);
  while (node) {
    if (node.left && node.left.val === key) { 
      node.left = replace(node.left); // if left child val is equal to key, set node.left to replace(node.left)
      break;
    } else if (node.right && node.right.val === key) {
      node.right = replace(node.right); // if right child val is equal to key, set node.right to replace(node.right)
      break;
    } else if (node.val < key) node = node.right; // otherwise, keep looking for the key, if node.val is smaller than key, we need to look right
    else node = node.left; // if node.val is bigger than key, we need to look left
  }
  return root;
};

function replace(root) {
  let node = root;
  if (!node.left && !node.right) return null;
  if (!node.left) return node.right;
  if (!node.right) return node.left;
  // find right most left child
  let rightMostLeftChild = findRight(node.left);
  // set right child of right most left child to node.right.left
  rightMostLeftChild.right = node.right.left;
  // set node.right.left to node.left
  node.right.left = node.left;
  // replace node with node.right
  node = node.right;
  // return new root
  return node;
}

// finds the deepest right node of node
function findRight(node) {
  while (node.right) {
    node = node.right;
  }
  return node;
}