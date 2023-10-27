// 863. All Nodes Distance K in Binary Tree
// Given the root of a binary tree, the value of a target node target, and an integer k, return an array of the values of all nodes that have a distance k from the target node.
// You can return the answer in any order.


// Solution: Recursive DFS

// 1. DFS from root, record parent of each node in a hashmap.
// 2. DFS from target, traverse in three directions:
  // a. to parent
  // b. to left child
  // c. to right child
// (in each traversal away from target, increment distance by 1)
// , keep a 'visited' set to avoid visiting nodes more than once.

// Time Complexity: O(n) 80ms
// Space Complexity: O(n) 41.4MB
var distanceK = function(root, target, k) {
  let parent = new Map(), visited = new Set();
  let res = [];
  getParent(root);
  dfs(target, 0);
  return res;

  function dfs(node, dist) {
    // if node is null OR node has been visited, RETURN
    if (!node || visited.has(node)) return;
    // if node is distance K from target, push value of node into res
    if (dist === k) {
      res.push(node.val);
      return;
    }
    // mark as visited
    visited.add(node);
    // traverse parent
    if (parent.has(node)) {
      dfs(parent.get(node), dist + 1);
    }
    // traverse left child
    dfs(node.left, dist + 1);
    // traverse right child
    dfs(node.right, dist + 1);
  } 

  function getParent(node) {
    if (node.left) {
      parent.set(node.left, node);
      getParent(node.left);
    }
    if (node.right) {
      parent.set(node.right, node);
      getParent(node.right);
    }
  }
};