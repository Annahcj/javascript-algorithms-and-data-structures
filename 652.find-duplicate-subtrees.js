// 652. Find Duplicate Subtrees
// Given the root of a binary tree, return all duplicate subtrees.
// For each kind of duplicate subtrees, you only need to return the root node of any one of them.
// Two trees are duplicate if they have the same structure with the same node values.


// Solution: Preorder Traversal Hashing

// Use preorder traversal to get the hash of a subtree.
// Mark null values as #, and use commas as the delimiter.
// Store the subtree hashes in a hashmap, and save the root when the map contains duplicates.

// Time Complexity: O(n^2) (because of the string concatenation) 104ms
// Space Complexity: O(n^2) 57.3MB
var findDuplicateSubtrees = function(root) {
  let map = new Map(), dups = [];
  dfs(root);
  return dups;
  
  function dfs(node) {
    if (!node) return '#';
    let values = [node.val];
    values.push(dfs(node.left));
    values.push(dfs(node.right));
    let hash = values.join(",");
    map.set(hash, (map.get(hash) || 0) + 1);
    if (map.get(hash) === 2) dups.push(node);
    return hash;
  }
};