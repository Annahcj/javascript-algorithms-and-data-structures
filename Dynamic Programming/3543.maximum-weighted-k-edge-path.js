// 3543. Maximum Weighted K-Edge Path
// You are given an integer n and a Directed Acyclic Graph (DAG) with n nodes labeled from 0 to n - 1. This is represented by a 2D array edges, where edges[i] = [ui, vi, wi] indicates a directed edge from node ui to vi with weight wi.
// You are also given two integers, k and t.
// Your task is to determine the maximum possible sum of edge weights for any path in the graph such that:
  // The path contains exactly k edges.
  // The total sum of edge weights in the path is strictly less than t.
// Return the maximum possible sum of weights for such a path. If no such path exists, return -1.


// Solution: DP

// Memoize each dp(node, sum, k), where
  // node = the current node
  // sum = current sum of edge weights
  // k = number of edges in the current path

// For each dp(node, sum, k), iterate through each neighbor node.
// Prune dp states if we have used up all k edges, or sum of weights exceeds t.

// Time Complexity: O(ntk) 462ms
// Space Complexity: O(ntk) 99MB
function maxWeight(n, edges, k, t) {
  const graph = Array(n).fill(0).map(() => []);
  for (let [u, v, w] of edges) {
    graph[u].push([v, w]);
  }
  let maxSum = -1;
  const memo = new Map();
  for (let i = 0; i < n; i++) {
    maxSum = Math.max(maxSum, dp(i, 0, k));
  }
  return maxSum;

  function dp(node, sum, k) {
    if (sum >= t) return -1;
    if (k === 0) return sum;
    const key = `${node},${sum},${k}`;
    if (memo.has(key)) return memo.get(key);

    let maxSum = -1;
    for (let [nei, weight] of graph[node]) {
      maxSum = Math.max(maxSum, dp(nei, sum + weight, k - 1));      
    }
    memo.set(key, maxSum);
    return maxSum;
  }  
};

// Solution: Bottom-up DP (TLE)

// Bottom-up version, which is slower because using recursion w/ memoization only traverses the possible paths.

function maxWeight(n, edges, k, t) {
  if (k === 0) return 0;
  let prev = Array(n).fill(0).map(() => []);
  for (let [u, v, w] of edges) {
    if (w < t) {
      prev[v].push(w);
    }
  }
  for (let i = 1; i < k; i++) {
    const curr = Array(n).fill(0).map(() => []);
    for (let [u, v, w] of edges) {
      for (let sum of prev[u]) {
        if (sum + w >= t) continue;
        curr[v].push(sum + w);
      }
    }
    prev = curr;
  }
  let maxSum = -1;
  for (let node = 0; node < n; node++) {
    maxSum = Math.max(maxSum, Math.max(...prev[node]));
  }
  return maxSum;
};

// Two test cases
console.log(maxWeight(3, [[0,1,1],[1,2,2]], 2, 4)) // 3
console.log(maxWeight(3, [[0,1,2],[0,2,3]], 1, 3)) // 2