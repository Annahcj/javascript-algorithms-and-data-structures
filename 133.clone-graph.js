// 133. Clone Graph
// Given a reference of a node in a connected undirected graph.
// Return a deep copy (clone) of the graph.


// LeetCode provided Node
function Node(val, neighbors) {
  this.val = val === undefined ? 0 : val;
  this.neighbors = neighbors === undefined ? [] : neighbors;
};

// Solution: Recursive DFS

// Time Complexity: O(n + m) 102ms
// Space Complexity: O(n) 40MB
var cloneGraph = function(node) {
  if (!node) return null;
  let map = new Map();
  return dfs(node);

  function dfs(node) {
    // return node if already seen
    if (map.has(node.val)) return map.get(node.val);
    // create new node since we have never seen node before
    let root = new Node(node.val);
    // memoize new node
    map.set(node.val, root);
    for (var neighbor of node.neighbors) {
      // visit neighbors
      root.neighbors.push(dfs(neighbor));
    }
    // return fully populated node
    return root;
  }  
};