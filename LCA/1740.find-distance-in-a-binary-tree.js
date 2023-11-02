// 1740. Find Distance in a Binary Tree
// Given the root of a binary tree and two integers p and q, return the distance between the nodes of value p and value q in the tree.
// The distance between two nodes is the number of edges on the path from one to the other.


// Solution: Find LCA 

// 1. Find the lowest common ancestor of p and q using recursive dfs.
// 2. Get the distances of p and q from the LCA, the answer is pDist + qDist.

// Time Complexity: O(n) 91ms
// Space Complexity: O(n) 52.4MB
var findDistance = function(root, p, q) {
  let lca = getLCA(root);
  let pDist, qDist;
  getDist(lca, 0);
  return pDist + qDist;
  
  function getLCA(node) {
    if (!node || node.val === p || node.val === q) return node;
    let left = getLCA(node.left), right = getLCA(node.right);
    if (left && right) return node;
    return left || right;
  }
  
  function getDist(node, dist) {
    if (!node) return;
    if (node.val === p) pDist = dist;
    if (node.val === q) qDist = dist;
    getDist(node.left, dist + 1);
    getDist(node.right, dist + 1);
  }
};