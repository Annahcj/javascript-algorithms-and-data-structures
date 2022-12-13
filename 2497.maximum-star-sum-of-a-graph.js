// 2497. Maximum Star Sum of a Graph
// There is an undirected graph consisting of n nodes numbered from 0 to n - 1. You are given a 0-indexed integer array vals of length n where vals[i] denotes the value of the ith node.
// You are also given a 2D integer array edges where edges[i] = [ai, bi] denotes that there exists an undirected edge connecting nodes ai and bi.
// A star graph is a subgraph of the given graph having a center node containing 0 or more neighbors. In other words, it is a subset of edges of the given graph such that there exists a common node for all edges.
// The star sum is the sum of the values of all the nodes present in the star graph.
// Given an integer k, return the maximum star sum of a star graph containing at most k edges.


// Solution: Sorting

// Get each node's neighbors and sort them by node value.
// Take the top k neighbor nodes for each node.
// Take the maximum sum of each node's k maximum neighbors.

// n = number of nodes, m = number of edges
// Time Complexity: O(n + m log(m)) 711ms
// Space Complexity: O(n + m) 116.2MB
var maxStarSum = function(vals, edges, k) {
  let n = vals.length, neighbors = Array(n).fill(0).map(() => []);
  for (let [a, b] of edges) {
    neighbors[a].push(vals[b]);
    neighbors[b].push(vals[a]);
  }
  
  let maxSum = -Infinity;
  for (let i = 0; i < n; i++) {
    neighbors[i].sort((a, b) => b - a); // sort neighbors by node value in desc order
    let sum = vals[i];
    for (let j = 0; j < Math.min(k, neighbors[i].length); j++) {
      if (neighbors[i][j] < 0) break; // no point taking negative values
      sum += neighbors[i][j];
    }
    maxSum = Math.max(maxSum, sum);
  }
  return maxSum;
};

// two test cases
console.log(maxStarSum([1,2,3,4,10,-10,-20], [[0,1],[1,2],[1,3],[3,4],[3,5],[3,6]], 2)) // 16
console.log(maxStarSum([-5], [], 0)) // -5