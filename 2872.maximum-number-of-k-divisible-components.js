// 2872. Maximum Number of K-Divisible Components
// There is an undirected tree with n nodes labeled from 0 to n - 1. You are given the integer n and a 2D integer array edges of length n - 1, where edges[i] = [a[i], b[i]] indicates that there is an edge between nodes a[i] and b[i] in the tree.
// You are also given a 0-indexed integer array values of length n, where values[i] is the value associated with the ith node, and an integer k.
// A valid split of the tree is obtained by removing any set of edges, possibly empty, from the tree such that the resulting components all have values that are divisible by k, where the value of a connected component is the sum of the values of its nodes.
// Return the maximum number of components in any valid split.

 
// Solution: Topological Sort

// Use topological sort to visit nodes starting from leaves.
// When we find a component where sum of values is divisible by k, it is optimal to take that component since it will not affect sums ahead of it, and we want the maximum number of components possible.

// If the current node value is divisible by k, take it and add one to the count of divisible components.
// Otherwise, add the current node's value to the next node.

// Note: 
  // The time complexity is calculated assuming we use a real queue instead of an array. 
  // Using a real queue, the time complexity of .shift() is O(1) instead of O(n).

// n = number of nodes, m = number of edges
// Time Complexity: O(n + m) 238ms
// Space Complexity: O(n + m) 87.3MB
var maxKDivisibleComponents = function(n, edges, values, k) {
  let graph = Array(n).fill(0).map(() => []), indegrees = Array(n).fill(0);
  for (let [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
    indegrees[a]++;
    indegrees[b]++;
  }
  let queue = [];
  for (let i = 0; i < n; i++) {
    if (indegrees[i] <= 1) queue.push(i);
  }
  let components = 0;
  while (queue.length) {
    let node = queue.shift();
    if (values[node] % k === 0) {
      components++;
    }
    for (let nei of graph[node]) {
      indegrees[nei]--;
      values[nei] = (values[nei] + values[node]) % k;
      if (indegrees[nei] === 1) {
        queue.push(nei);
      }
    }
  }
  return components;
};

// Two test cases
console.log(maxKDivisibleComponents(5, [[0,2],[1,2],[1,3],[2,4]], [1,8,1,4,4], 6)) // 2
console.log(maxKDivisibleComponents(7, [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]], [3,0,6,1,5,2,1], 3)) // 3