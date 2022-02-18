// 1932. Merge BSTs to Create Single BST
// You are given n BST (binary search tree) root nodes for n separate BSTs stored in an array trees (0-indexed). Each BST in trees has at most 3 nodes, and no two roots have the same value. In one operation, you can:
  // Select two distinct indices i and j such that the value stored at one of the leaves of trees[i] is equal to the root value of trees[j].
  // Replace the leaf node in trees[i] with trees[j].
  // Remove trees[j] from trees.
// Return the root of the resulting BST if it is possible to form a valid BST after performing n - 1 operations, or null if it is impossible to create a valid BST.


// Solution: Hashmaps & Root-to-Value Mapping

// A few things to keep in mind:
  // All root values are unique.
  // To create a valid BST, all root values (except the final root) must map to exactly one leaf value (there cannot be multiple leaf values which are the same)

// 1. Map roots to their matching leaves. Also keep track of the total count of nodes.
  // This total count would have counted every single node once, so after joining into a valid BST, exactly n - 1 nodes would have been counted twice. 
  // So, we subtract n - 1 from our nodes count.
// 2. Get the root which doesn't map to any leaf node, this is the final root.
// 3. Merge all the leaves -> roots together.
// 4. Validate the final tree. 

// Time Complexity: O(n) 516ms
// Space Complexity: O(n) 79.1MB
var canMerge = function(trees) {
  let leaves = new Map(), roots = new Set(), nodesCnt = 0, n = trees.length;

  // map roots to matching leaves
  for (let tree of trees) {
    roots.add(tree.val);
    nodesCnt++;
    if (tree.left) {
      leaves.set(tree.left.val, tree); // save the parent/root so that we can replace it easily
      nodesCnt++;
    }
    if (tree.right) {
      leaves.set(tree.right.val, tree); // save the parent/root so that we can replace it easily
      nodesCnt++;
    }
  }
  nodesCnt = nodesCnt - (n - 1); // there are exactly n - 1 overlapping nodes counted
  
  // get the finalRoot
  let finalRoot = null;
  for (let tree of trees) {
    if (!leaves.has(tree.val)) {
      finalRoot = tree;
    }
  }
  
  for (let tree of trees) {
    if (tree !== finalRoot && leaves.has(tree.val)) {
      let leafParent = leaves.get(tree.val);
      if (leafParent.left && leafParent.left.val === tree.val) {
        leafParent.left = tree;
      } else {
        leafParent.right = tree;
      }
      roots.delete(tree.val); // after merging, delete the root. There should be exactly 1 root left at the end.
    }
  }
  // must be one root left, and node count must equal the total nodes
  return roots.size === 1 && countNodes(finalRoot) === nodesCnt ? finalRoot : null;
};

function countNodes(root, min = -Infinity, max = Infinity) {
  if (!root) return 0;
  if (root.val <= min || root.val >= max) return 0;
  return 1 + countNodes(root.left, min, root.val) + countNodes(root.right, root.val, max);
}