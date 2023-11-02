// 2920. Maximum Points After Collecting Coins From All Nodes
// There exists an undirected tree rooted at node 0 with n nodes labeled from 0 to n - 1. You are given a 2D integer array edges of length n - 1, where edges[i] = [a[i], b[i]] indicates that there is an edge between nodes a[i] and b[i] in the tree. You are also given a 0-indexed array coins of size n where coins[i] indicates the number of coins in the vertex i, and an integer k.
// Starting from the root, you have to collect all the coins such that the coins at a node can only be collected if the coins of its ancestors have been already collected.
// Coins at node[i] can be collected in one of the following ways:
  // Collect all the coins, but you will get coins[i] - k points. If coins[i] - k is negative then you will lose abs(coins[i] - k) points.
  // Collect all the coins, but you will get floor(coins[i] / 2) points. If this way is used, then for all the nodej present in the subtree of nodei, coins[j] will get reduced to floor(coins[j] / 2).
// Return the maximum points you can get after collecting the coins from all the tree nodes.


// Solution: DP - Recursion w/ Memoization

// For the second type of operation (floor(coins[i] / 2)), instead of physically updating all the subtree values, we can pass down the number of reductions we need to perform on the subtree nodes.

// Memoize each dp(node, reductions), where dp(node, reductions) is the maximum points for the subtree rooted at node `node`, with `reductions` division 2 reductions that need to be performed on the current node value.

// For each dp(node, reductions, parent), first we need to get the updated node value (divide coins[node] by the appropriate number of reductions).
// We then have two choices:
  // 1. Take coins[node] - k.
  // 2. Take Math.floor(coins[node] / 2), and increase reductions by 1 for all child nodes.
// Return the maximum points in these two situations.

// Note: 
  // We can observe that the maximum number of reductions needed to turn the maximum coin value (10^4) into 0 is 14.
  // There is no point performing more reductions once the node value becomes 0.

// Time Complexity: O(n * 15) 475ms
// Space Complexity: O(n * 15) 185.5MB
var maximumPoints = function(edges, coins, k) {
  let n = edges.length + 1, graph = Array(n).fill(0).map(() => []);
  for (let [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }
  let memo = Array(n).fill(0).map(() => Array(15).fill(null));
  return dp(0, 0, -1);
  
  function dp(node, reductions, parent) { 
    if (memo[node][reductions] !== null) return memo[node][reductions];
    
    let nodeValue = coins[node] >> reductions;
    let option1 = nodeValue - k, option2 = Math.floor(nodeValue / 2);
    for (let child of graph[node]) {
      if (child === parent) continue;
      option1 += dp(child, reductions, node);
      option2 += dp(child, Math.min(14, reductions + 1), node);
    }
    return memo[node][reductions] = Math.max(option1, option2);
  }
};

// Two test cases
console.log(maximumPoints([[0,1],[1,2],[2,3]], [10,10,3,3], 5)) // 11
console.log(maximumPoints([[0,1],[0,2]], [8,4,4], 0)) // 16