// 3559. Number of Ways to Assign Edge Weights II
// There is an undirected tree with n nodes labeled from 1 to n, rooted at node 1. The tree is represented by a 2D integer array edges of length n - 1, where edges[i] = [ui, vi] indicates that there is an edge between nodes ui and vi.
// Initially, all edges have a weight of 0. You must assign each edge a weight of either 1 or 2.
// The cost of a path between any two nodes u and v is the total weight of all edges in the path connecting them.
// You are given a 2D integer array queries. For each queries[i] = [ui, vi], determine the number of ways to assign weights to edges in the path such that the cost of the path between ui and vi is odd.
// Return an array answer, where answer[i] is the number of valid assignments for queries[i].
// Since the answer may be large, apply modulo 10^9 + 7 to each answer[i].
// Note: For each query, disregard all edges not in the path between node ui and vi.


// Solution: Binary Lifting

// Use binary lifting to find the distance between two nodes in O(log(n)) time.
// Distance between two nodes (u, v) = dist(lca(u, v), u) + dist(lca(u, v), v).

// Given a distance between two nodes, 
// we can find the number of ways to assign weights such that the total sum is odd:
  // 2^(dist - 1).
// 2^dist gives us every combination of weights on the path.
// Exactly half of those combinations will have an odd total sum.
// 2^(dist - 1) is equal to half of 2^dist.

// n = number of nodes, m = number of queries
// Time Complexity: O(n log(n) + m log(n)) 1180ms
// Space Complexity: O(n log(n)) 160MB
function assignEdgeWeights(edges, queries) {
  const n = edges.length + 1, graph = Array(n).fill(0).map(() => []);
  for (let [u, v] of edges) {
    graph[u - 1].push(v - 1);
    graph[v - 1].push(u - 1);
  }
  const directParent = Array(n), depth = Array(n);
  dfs(0, -1, 0);
  const lca = new LCA(n, directParent, depth);
  const answer = [], MOD = 1000000007n;
  for (let [u, v] of queries) {
    const pathLen = lca.getDist(u - 1, v - 1);
    const ways = pathLen === 0 ? 0n : 2n ** BigInt(pathLen - 1);
    answer.push(Number(ways % MOD));
  }
  return answer;

  function dfs(node, parent, currDepth) {
    directParent[node] = parent;
    depth[node] = currDepth;
    for (let nei of graph[node]) {
      if (nei === parent) continue;
      dfs(nei, node, currDepth + 1);
    }
  }
};

class LCA {
  constructor(n, parent, depths) {
    this.maxDepth = Math.ceil(Math.log2(n));
    this.p = Array(this.maxDepth + 1).fill(0).map(() => Array(n).fill(-1)); // parents
    this.depths = depths;
    for (let node = 0; node < n; node++) {
      this.p[0][node] = parent[node];
    }
    for (let pow2 = 1; pow2 <= this.maxDepth; pow2++) {
      for (let node = 0; node < n; node++) {
        const halfParent = this.p[pow2 - 1][node]; 
        if (halfParent !== -1) {
          this.p[pow2][node] = this.p[pow2 - 1][halfParent];
        }
      }
    }
  }
  getLCA(a, b) {
    if (this.depths[a] > this.depths[b]) {
      let temp = a;
      a = b;
      b = temp;
    }
    let depthDiff = this.depths[b] - this.depths[a];
    for (let i = 0; i <= this.maxDepth; i++) {
      if ((depthDiff >> i) & 1) {
        b = this.p[i][b]; // move b up to the 2^ith parent
      }
    }
    if (a === b) return a;

    // move both nodes up by 2^ith levels if the 2^ith parents are not equal
    for (let i = this.maxDepth; i >= 0; i--) { // this decrements so that we can jump the nodes up incrementally
      if (this.p[i][a] !== this.p[i][b]) { // if 2^ith parents of both nodes are not equal, we can safely both move up  
        a = this.p[i][a];
        b = this.p[i][b];
      }
    }
    return this.p[0][a];
  }
  getDist(a, b) {
    const lca = this.getLCA(a, b);
    const depthA = this.depths[a] - this.depths[lca];
    const depthB = this.depths[b] - this.depths[lca];
    return depthA + depthB;
  }
}

// Two test cases
console.log(assignEdgeWeights([[1,2]], [[1,1],[1,2]])) // [0,1]
console.log(assignEdgeWeights([[1,2],[1,3],[3,4],[3,5]], [[1,4],[3,4],[2,5]])) // [2,1,4]