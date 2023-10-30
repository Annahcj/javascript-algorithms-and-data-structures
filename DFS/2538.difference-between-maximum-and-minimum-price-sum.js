// 2538. Difference Between Maximum and Minimum Price Sum
// There exists an undirected and initially unrooted tree with n nodes indexed from 0 to n - 1. You are given the integer n and a 2D integer array edges of length n - 1, where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the tree.
// Each node has an associated price. You are given an integer array price, where price[i] is the price of the ith node.
// The price sum of a given path is the sum of the prices of all nodes lying on that path.
// The tree can be rooted at any node root of your choice. The incurred cost after choosing root is the difference between the maximum and minimum price sum amongst all paths starting at root.
// Return the maximum possible cost amongst all possible root choices.


// Solution: DFS 

// Minimum price path will always be itself because all nodes have a positive value. So taking any more values will only make the sum larger.
// That leaves just the maximum price path.
// Memoize each dp(node, prev).
// Get the maximum path sum taking each node as the root.
// Record the maximum (max path sum with root i) - price[i]

// n = number of nodes, m = number of edges
// Time Complexity: O(n + m) 1589ms
// Space Complexity: O(n + m) 137.6MB
var maxOutput = function(n, edges, price) {
  let graph = Array(n).fill(0).map(() => []);
  for (let [x, y] of edges) {
    graph[x].push(y);
    graph[y].push(x);
  }
  let memo = new Map(), res = 0;
  for (let i = 0; i < n; i++) {
    res = Math.max(res, dfs(i, -1) - price[i]);
  }
  return res;
  
  function dfs(node, prev) {    
    let key = `${node},${prev}`;
    if (memo.has(key)) return memo.get(key);
    
    let max = 0;
    for (let nei of graph[node]) {
      if (nei === prev) continue;
      max = Math.max(max, dfs(nei, node));
    }
    memo.set(key, max + price[node]);
    return max + price[node];
  }  
};

// Two test cases
console.log(maxOutput(6, [[0,1],[1,2],[1,3],[3,4],[3,5]], [9,8,7,6,10,5])) // 24
console.log(maxOutput(6, [[0,1],[1,2]], [1,1,1])) // 2