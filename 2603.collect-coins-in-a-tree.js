// 2603. Collect Coins in a Tree
// There exists an undirected and unrooted tree with n nodes indexed from 0 to n - 1. You are given an integer n and a 2D integer array edges of length n - 1, where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the tree. You are also given an array coins of size n where coins[i] can be either 0 or 1, where 1 indicates the presence of a coin in the vertex i.
// Initially, you choose to start at any vertex in the tree. Then, you can perform the following operations any number of times: 
  // Collect all the coins that are at a distance of at most 2 from the current vertex, or
  // Move to any adjacent vertex in the tree.
// Find the minimum number of edges you need to go through to collect all the coins and go back to the initial vertex.
// Note that if you pass an edge several times, you need to count it into the answer several times.


// Solution: Two Topological Sorts

// 1. Trim the leaves of the tree that are not coins.
// 2. Move coin leaf nodes up two levels (to the parent parent node).

// From here, the answer is (the number of nodes left over - 1) * 2, since each edge will be traversed exactly twice.

// Note: The time complexity is assuming we use a real queue (where .shift is O(1)) and not an array (where .shift is O(n)).

// n = number of nodes, m = number of edges
// Time Complexity: O(n + m) 583ms
// Space Complexity: O(n + m) 83.3MB
var collectTheCoins = function(coins, edges) {
  let n = coins.length, graph = Array(n).fill(0).map(() => new Set());
  let indegrees = Array(n).fill(0);
  for (let [a, b] of edges) {
    graph[a].add(b);
    graph[b].add(a);
    indegrees[a]++;
    indegrees[b]++;
  }
  let queue = [], count = n;
  for (let i = 0; i < n; i++) {
    if (indegrees[i] === 1) queue.push(i);
  }
  while (queue.length) {
    let node = queue.shift();
    if (coins[node]) continue;
    count--;
    for (let nei of graph[node]) {
      // trim leaf nodes that are not coins
      graph[node].delete(nei); 
      graph[nei].delete(node);
      if (--indegrees[nei] === 1) {
        queue.push(nei);
      }
    } 
  }
  
  // move coin leaf nodes up two levels
  queue = [];
  for (let i = 0; i < n; i++) {
    if (indegrees[i] === 1 && coins[i]) queue.push(i);
  }
  for (let i = 0; i < 2; i++) {
    for (let j = queue.length; j > 0; j--) {
      let node = queue.shift();
      count--;
      for (let nei of graph[node]) {
        if (--indegrees[nei] === 1) {
          queue.push(nei);
        }
      }
    }
  }
  return 2 * Math.max(0, count - 1);
};

// Two test cases
console.log(collectTheCoins([1,0,0,0,0,1], [[0,1],[1,2],[2,3],[3,4],[4,5]])) // 2
console.log(collectTheCoins([0,0,0,1,1,0,0,1], [[0,1],[0,2],[1,3],[1,4],[2,5],[5,6],[5,7]])) // 2