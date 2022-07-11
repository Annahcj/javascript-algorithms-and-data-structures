// 2192. All Ancestors of a Node in a Directed Acyclic Graph
// You are given a positive integer n representing the number of nodes of a Directed Acyclic Graph (DAG). The nodes are numbered from 0 to n - 1 (inclusive).
// You are also given a 2D integer array edges, where edges[i] = [fromi, toi] denotes that there is a unidirectional edge from fromi to toi in the graph.
// Return a list answer, where answer[i] is the list of ancestors of the ith node, sorted in ascending order.
// A node u is an ancestor of another node v if u can reach v via a set of edges.


// Solution: DFS

// 1. Create a reversed graph - this way we can traverse all ancestors of a node
// 2. For each node,
  // DFS to all ancestors
  // Keep track of nodes we have visited to avoid revisiting

// Time Complexity: O(n^2) 600ms
// Space Complexity: O(n^2) 94.1MB
var getAncestors = function(n, edges) {
  let reversed = Array(n).fill(0).map(() => []);
  for (let [x, y] of edges) {
    reversed[y].push(x);
  }
  
  let ancestors = Array(n).fill(0).map(() => []);
  for (let i = 0; i < n; i++) {
    let seen = Array(n).fill(0);
    dfs(i, i, seen);
    ancestors[i].sort((a, b) => a - b);
  }
  return ancestors;
  
  function dfs(root, node, seen) {
    seen[node] = 1;
    if (node !== root) ancestors[root].push(node);
    for (let parent of reversed[node]) {
      if (seen[parent]) continue;
      dfs(root, parent, seen);
    }
  }
};

// Two test cases to run function on
console.log(getAncestors(8, [[0,3],[0,4],[1,3],[2,4],[2,7],[3,5],[3,6],[3,7],[4,6]])) // [[],[],[],[0,1],[0,2],[0,1,3],[0,1,2,3,4],[0,1,2,3]]
console.log(getAncestors(5, [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]])) // [[],[0],[0,1],[0,1,2],[0,1,2,3]]