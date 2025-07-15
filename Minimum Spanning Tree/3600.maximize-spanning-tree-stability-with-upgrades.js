// 3600. Maximize Spanning Tree Stability with Upgrades
// You are given an integer n, representing n nodes numbered from 0 to n - 1 and a list of edges, where edges[i] = [ui, vi, si, musti]:
  // ui and vi indicates an undirected edge between nodes ui and vi.
  // si is the strength of the edge.
  // musti is an integer (0 or 1). If musti == 1, the edge must be included in the spanning tree. These edges cannot be upgraded.
// You are also given an integer k, the maximum number of upgrades you can perform. Each upgrade doubles the strength of an edge, and each eligible edge (with musti == 0) can be upgraded at most once.
// The stability of a spanning tree is defined as the minimum strength score among all edges included in it.
// Return the maximum possible stability of any valid spanning tree. If it is impossible to connect all nodes, return -1.
// Note: A spanning tree of a graph with n nodes is a subset of the edges that connects all nodes together (i.e. the graph is connected) without forming any cycles, and uses exactly n - 1 edges.


// Solution: Kruskal's Algorithm

// All nodes must be connected at the end, we need to use exactly n - 1 edges.
// Sort the edges in descending order.
// Use all edges with must = 1, and use the edges where the two components are not connected yet.
// Do this until all nodes are connected.

// To get the minimum weight utilizing the k upgrades, store the strengths taken on the second pass.
// At the end, use the k upgrades on the last k strengths taken (the smallest strengths), and double them. 
// The minimum weight is minimum of:
  // min from first pass
  // min up to the kth last edge used
  // smallest weight * 2

// Time Complexity: O(m log(m) + n) 293ms
// Space Complexity: O(n) 103MB
function maxStability(n, edges, k) {
  edges.sort((a, b) => b[2] - a[2]);
  const uf = new UnionFind(n);
  let minStrength = Infinity, edgesUsed = 0;
  // first, take all edges with must = 1
  for (let [u, v, s, must] of edges) {
    if (must === 1) {
      uf.union(u, v);
      minStrength = Math.min(minStrength, s);
      edgesUsed++;
    }
  }
  const strengths = [];
  for (let [u, v, s, must] of edges) {
    if (must === 0 && !uf.isConnected(u, v)) {
      uf.union(u, v);
      strengths.push(s);
      edgesUsed++;
    }
  }
  if (uf.size !== 1 || edgesUsed !== n - 1) {
    return -1;
  }
  if (strengths.length <= k) {
    return Math.min(minStrength, strengths.length ? strengths[strengths.length - 1] * 2 : Infinity);
  }
  return Math.min(minStrength, strengths[strengths.length - 1 - k], strengths[strengths.length - 1] * 2);
};

class UnionFind {
  constructor(size) {
    this.root = Array(size);
    this.rank = Array(size);
    this.size = size;
    for (let i = 0; i < size; i++) {
      this.root[i] = i;
      this.rank[i] = 1;
    }
  }
  find(x) {
    if (this.root[x] === x) return x;
    return this.root[x] = this.find(this.root[x]);
  }
  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);
    if (rootX === rootY) return false;
    if (this.rank[rootX] > this.rank[rootY]) {
      this.root[rootY] = rootX;
    } else if (this.rank[rootX] < this.rank[rootY]) {
      this.root[rootX] = rootY;
    } else {
      this.root[rootY] = rootX;
      this.rank[rootX]++;
    }
    this.size--;
    return true;
  }
  isConnected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// Three test cases
console.log(maxStability(3, [[0,1,2,1],[1,2,3,0]], 1)) // 2
console.log(maxStability(3, [[0,1,4,0],[1,2,3,0],[0,2,1,0]], 2)) // 6
console.log(maxStability(3, [[0,1,1,1],[1,2,1,1],[2,0,1,1]], 0)) // -1