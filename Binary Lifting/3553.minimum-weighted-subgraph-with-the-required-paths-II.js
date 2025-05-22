// 3553. Minimum Weighted Subgraph With the Required Paths II
// You are given an undirected weighted tree with n nodes, numbered from 0 to n - 1. It is represented by a 2D integer array edges of length n - 1, where edges[i] = [ui, vi, wi] indicates that there is an edge between nodes ui and vi with weight wi.​
// Additionally, you are given a 2D integer array queries, where queries[j] = [src1j, src2j, destj].
// Return an array answer of length equal to queries.length, where answer[j] is the minimum total weight of a subtree such that it is possible to reach destj from both src1j and src2j using edges in this subtree.
// A subtree here is any connected subset of nodes and edges of the original tree forming a valid tree.


// Solution: Binary Lifting & LCA

// To calculate the minimum weight of distinct edges along the paths from (a, b, c), the formula is:
  // (dist(a, b) + dist(a, c) + dist(b, c)) / 2.
  // This is because every edge is counted twice (specifically n-1 times per edge).
  // If you imagine going through every pair of nodes in a tree (1,2), (1,3), (1,4), (2,3), (2,4), (3,4), notice that the same edges are visited n-1 times.

// Use binary lifting to find the distance between two nodes, using the LCA.
// To find the distance between two nodes (a, b), 
  // 1. Find the LCA
  // 2. Get the difference in depth between a and the lca, and b and the lca.
  // 3. Get the sum of weights from node a to the lca (kth ancestor), and from b to the lca.

// n = number of nodes, m = number of queries
// Time Complexity: O(n log(n) + m log(n)) 1134ms
// Space Complexity: O(n log(n)) 186MB
function minimumWeight(edges, queries) {
  const n = edges.length + 1, graph = Array(n).fill(0).map(() => []);
  for (let [u, v, w] of edges) {
    graph[u].push([v, w]);
    graph[v].push([u, w]);
  }
  const [parent, depth] = getParents(graph);
  const lca = new LCA(n, parent, depth);
  const ans = [];
  for (let [src1, src2, dest] of queries) {
    ans.push((lca.getDist(src1, src2) + lca.getDist(src1, dest) + lca.getDist(src2, dest)) / 2);
  }
  return ans;
};

function getParents(graph) {
  const n = graph.length, parentMap = Array(n).fill(0).map(() => [-1, 0]);
  const depth = Array(n);
  dfs(0, -1, 0);
  return [parentMap, depth];

  function dfs(node, parent, currDepth) {
    depth[node] = currDepth;
    for (let [nei, weight] of graph[node]) {
      if (nei === parent) continue;
      parentMap[nei] = [node, weight];
      dfs(nei, node, currDepth + 1);
    }
  }
}

class LCA {
  constructor(n, parent, depths) {
    this.maxDepth = Math.ceil(Math.log2(n));
    this.p = Array(this.maxDepth + 1).fill(0).map(() => Array(n).fill(-1)); // parents
    this.w = Array(this.maxDepth + 1).fill(0).map(() => Array(n).fill(0)); // sum of weights
    this.depths = depths;
    for (let node = 0; node < n; node++) {
      this.p[0][node] = parent[node][0];
      this.w[0][node] = parent[node][1];
    }
    for (let pow2 = 1; pow2 <= this.maxDepth; pow2++) {
      for (let node = 0; node < n; node++) {
        const halfParent = this.p[pow2 - 1][node]; 
        if (halfParent !== -1) {
          this.p[pow2][node] = this.p[pow2 - 1][halfParent]; 
          this.w[pow2][node] = this.w[pow2 - 1][node] + this.w[pow2 - 1][halfParent];
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
  getDist(a, b) { // get sum of weights from a to b
    const lca = this.getLCA(a, b);
    // get sum of weights from a to lca and b to lca.
    const depthA = this.depths[a] - this.depths[lca];
    const depthB = this.depths[b] - this.depths[lca];
    return this.#getKthWeightSum(a, depthA) + this.#getKthWeightSum(b, depthB);
  }
  #getKthWeightSum(node, k) { // get sum of weights from i to the kth ancestor
    let sum = 0;
    for (let i = 0; i < this.maxDepth; i++) {
      if (k & (1 << i)) {
        sum += this.w[i][node];
        node = this.p[i][node];
      }
    }
    return sum;
  }
}

// Two test cases
console.log(minimumWeight([[0,1,2],[1,2,3],[1,3,5],[1,4,4],[2,5,6]], [[2,3,4],[0,2,5]])) // [12,11]
console.log(minimumWeight([[1,0,8],[0,2,7]], [[0,1,2]])) // [15]