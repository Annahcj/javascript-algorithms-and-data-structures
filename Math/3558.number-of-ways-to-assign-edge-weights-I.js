// 3558. Number of Ways to Assign Edge Weights I
// There is an undirected tree with n nodes labeled from 1 to n, rooted at node 1. The tree is represented by a 2D integer array edges of length n - 1, where edges[i] = [ui, vi] indicates that there is an edge between nodes ui and vi.
// Initially, all edges have a weight of 0. You must assign each edge a weight of either 1 or 2.
// The cost of a path between any two nodes u and v is the total weight of all edges in the path connecting them.
// Select any one node x at the maximum depth. Return the number of ways to assign edge weights in the path from node 1 to x such that its total cost is odd.
// Since the answer may be large, return it modulo 10^9 + 7.
// Note: Ignore all edges not in the path from node 1 to x.


// Solution: Counting & Math

// Find the maximum deoth of the tree. 
// The number of edges on the path is max depth - 1.

// Counting the combinations of weights where the sum is odd:
  // If the number of 1's are odd, the total sum will be odd.
  // All combinations = 2^path length
  // Combinations with only an odd number of 1's = 2^(path length - 1).
    // This is half of all combinations.
    // Proof by examples:
      // path len = 4, total combs = 16, odd combs = 8
      // path len = 3, total combs = 8, odd combs = 4

// Examples:
  // Path length = 3
    // 111 121 112 211 122 212 221 222
    //  _               _   _   _   
    // The 4 highlighted combinations have an odd number of 1's.
    // 4 is half of 8, the total number of combinations.

  // Path length = 4
    // 1111 2111 1211 1121 1112 1122 2211
    //       _    _    _    _    _  
    // 2121 2112 1221 1212 2221 2212
    //                      _    _
    // 1222 2122 2222
    //  _    _
    // The 8 highlighted combinations have an odd number of 1's.
    // 8 is half of 16, the total combinations.

// Time Complexity: O(n) 473ms
// Space Complexity: O(n) 139MB
function assignEdgeWeights(edges) {
  const n = edges.length + 1, graph = Array(n).fill(0).map(() => []);
  for (let [u, v] of edges) {
    graph[u - 1].push(v - 1);
    graph[v - 1].push(u - 1);
  }
  let maxDepth = 1;
  dfs(0, -1, 1);
  const pathLen = BigInt(maxDepth - 1);
  const MOD = 1000000007n, ways = 2n ** (pathLen - 1n);
  return Number(ways % MOD);

  function dfs(node, parent, depth) {
    maxDepth = Math.max(maxDepth, depth);
    for (let nei of graph[node]) {
      if (nei === parent) continue;
      dfs(nei, node, depth + 1);
    }
  }
};

// Two test cases
console.log(assignEdgeWeights([[1,2]])) // 1
console.log(assignEdgeWeights([[1,2],[1,3],[3,4],[3,5]])) // 2