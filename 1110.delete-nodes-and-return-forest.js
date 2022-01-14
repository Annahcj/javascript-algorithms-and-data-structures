// 1110. Delete Nodes And Return Forest
// Given the root of a binary tree, each node in the tree has a distinct value.
// After deleting all nodes with a value in to_delete, we are left with a forest (a disjoint union of trees).
// Return the roots of the trees in the remaining forest. You may return the result in any order.


// Solution: Recursive DFS

// Turn to_delete into a set for quick access.

// Each node needs to know whether it is a new root (after the parent has been deleted), and also must not be deleted itself.
// To sum it up: If a node doesn't have a parent anymore AND it is not deleted itself, then add it to the result.

// Time Complexity: O(n) 104ms
// Space Complexity: O(n) 47.1MB
var delNodes = function(root, to_delete) {
  let res = [], deleteSet = new Set(to_delete);
  dfs(root, true);
  return res;
  
  function dfs(node, isRoot) {
    if (!node) return null;
    let deleted = deleteSet.has(node.val);
    if (isRoot && !deleted) res.push(node);
    node.left = dfs(node.left, deleted);
    node.right = dfs(node.right, deleted);
    return deleted ? null : node;
  }
};