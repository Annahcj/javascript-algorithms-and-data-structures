// 1650. Lowest Common Ancestor of a Binary Tree III
// Given two nodes of a binary tree p and q, return their lowest common ancestor (LCA).


// Solution: Find Depths, Move Level by Level

// 1. Find depths of nodes p and q (keep going up the tree by .parent until root is reached)
// 2. Move the node with a greater depth up the tree until both nodes are on the same level.
// 3. Move both nodes up the tree until they meet.
// 4. Return either p or q, since they will be the same.

// h = height of p + height of q
// Time Complexity: O(h) 92ms
// Space Complexity: O(1) 42.6MB
var lowestCommonAncestor = function(p, q) {
  let pDepth = findDepth(p);
  let qDepth = findDepth(q);
  function findDepth(node) {
    let depth = 0;
    while (node.parent) {
      node = node.parent;
      depth++;
    }
    return depth;
  }  
  while (pDepth > qDepth) {
    p = p.parent;
    pDepth--;
  }
  while (qDepth > pDepth) {
    q = q.parent;
    qDepth--;
  }
  while (p !== q) {
    p = p.parent;
    q = q.parent;
  }
  return p;
};


// Solution 2: Store Path of p, Find Common Point.

// p = length of the path of p, n = height of tree
// Time Complexity: O(n) 88ms
// Space Complexity: O(p) 44.3MB
var lowestCommonAncestor = function(p, q) {
  let path = new Set();
  while (p !== null) {
    path.add(p);
    p = p.parent;
  }
  while (q !== null) {
    if (path.has(q)) {
      return q;
    }
    q = q.parent;
  }
};