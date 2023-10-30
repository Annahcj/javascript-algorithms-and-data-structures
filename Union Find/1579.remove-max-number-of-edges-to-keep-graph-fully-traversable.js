// 1579. Remove Max Number of Edges to Keep Graph Fully Traversable
// Alice and Bob have an undirected graph of n nodes and 3 types of edges:
  // Type 1: Can be traversed by Alice only.
  // Type 2: Can be traversed by Bob only.
  // Type 3: Can by traversed by both Alice and Bob.
// Given an array edges where edges[i] = [typei, ui, vi] represents a bidirectional edge of type typei between nodes ui and vi, find the maximum number of edges you can remove so that after removing the edges, the graph can still be fully traversed by both Alice and Bob. The graph is fully traversed by Alice and Bob if starting from any node, they can reach all other nodes.
// Return the maximum number of edges you can remove, or return -1 if it's impossible for the graph to be fully traversed by Alice and Bob.


// Solution: Union Find

// Keep two sets of union find, for both alice and bob.

// 1. Traverse all type 3 paths
// 2. Traverse type 1 and type 2 paths

// If two vertices are already connected, increment res (redundant paths).
// Check to make sure both alice and bob have a total of n - 1 connections before returning res.

// Time Complexity: O(n) 260ms
// Space Complexity: O(n) 72.9MB
var maxNumEdgesToRemove = function(n, edges) {
  let aUF = new UnionFind(n), bUF = new UnionFind(n);
  let res = 0;
  for (let [type, x, y] of edges) {
    if (type !== 3) continue;
    if (!aUF.connected(x, y)) {
      aUF.union(x, y);
      bUF.union(x, y);
    } else {
      res++;
    }
  } 
  for (let [type, x, y] of edges) {
    if (type === 1) {
      if (!aUF.connected(x, y)) {
        aUF.union(x, y);
      } else {
        res++;
      }
    } else if (type === 2) {
      if (!bUF.connected(x, y)) {
        bUF.union(x, y);
      } else {
        res++;
      }
    }
  } 
  return aUF.size === n - 1 && bUF.size === n - 1 ? res : -1;
};

class UnionFind {
  constructor(size) {
    this.root = Array(size + 1);
    this.rank = Array(size + 1);
    this.size = 0;
    for (let i = 1; i <= size; i++) {
      this.root[i] = i;
      this.rank[i] = 1;
    }
  }
  find(x) {
    if (this.root[x] === x) return x;
    this.root[x] = this.find(this.root[x]);
    return this.root[x];
  }
  union(x, y) {
    let rootX = this.find(x), rootY = this.find(y);
    if (this.rank[rootX] < this.rank[rootY]) {
      this.root[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.root[rootY] = rootX;
    } else {
      this.root[rootY] = rootX;
      this.rank[rootX]++;
    }
    this.size++;
  }
  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// Three test cases
console.log(maxNumEdgesToRemove(4, [[3,1,2],[3,2,3],[1,1,3],[1,2,4],[1,1,2],[2,3,4]])) // 2
console.log(maxNumEdgesToRemove(4, [[3,1,2],[3,2,3],[1,1,4],[2,1,4]])) // 0
console.log(maxNumEdgesToRemove(4, [[3,2,3],[1,1,2],[2,3,4]])) // -1