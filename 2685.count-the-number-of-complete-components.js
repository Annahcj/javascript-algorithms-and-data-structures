// 2685. Count the Number of Complete Components
// You are given an integer n. There is an undirected graph with n vertices, numbered from 0 to n - 1. You are given a 2D integer array edges where edges[i] = [a[i], b[i]] denotes that there exists an undirected edge connecting vertices a[i] and b[i].
// Return the number of complete connected components of the graph.
// A connected component is a subgraph of a graph in which there exists a path between any two vertices, and no vertex of the subgraph shares an edge with a vertex outside of the subgraph.
// A connected component is said to be complete if there exists an edge between every pair of its vertices.


// Solution: Union Find

// Use union find to find each connected component.
// For each connected component, find the number of nodes and edges in the group.
// The number of edges needed for a complete connected component = ((groupSize - 1) * groupSize) / 2

// n = number of nodes, m = number of edges
// Time Complexity: O(n + m) 176ms
// Space Complexity: O(n) 53.3MB
var countCompleteComponents = function(n, edges) {
  let uf = new UnionFind(n);
  for (let [a, b] of edges) {
    uf.union(a, b);
  }
  let groupSize = {};
  for (let i = 0; i < n; i++) { // find the number of nodes in each connected component
    let parent = uf.find(i);
    groupSize[parent] = (groupSize[parent] || 0) + 1;
  }
  let count = {};
  for (let [a, _b] of edges) { // find the number of edges in each connected component
    let parent = uf.find(a); // parent of a = parent of b (since a and b are connected)
    count[parent] = (count[parent] || 0) + 1;
  }
  let complete = 0;
  for (let parent in groupSize) { // find the number of complete connected components
    let edgesCount = count[parent] || 0;
    let size = groupSize[parent];
    if (edgesCount === ((size - 1) * size) / 2) complete++;
  }
  return complete;
};

class UnionFind {
  constructor(size) {
    this.root = Array(size);
    this.rank = Array(size)
    for (var i = 0; i < size; i++) {
      this.root[i] = i;
      this.rank[i] = 1;
    }
  }
  // recursively finding the root of x, setting roots of all along the path to the root from bottom up.
  find(x) {
    if (this.root[x] === x) {
      return x;
    }
    return this.root[x] = this.find(this.root[x]);
  }
  // choose side whose rank (height) is smaller to set as root out of (x, y)
  // if the heights are equal, set it either way (set x as root for simplicity) and increase rank of x by one.
  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);
    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.root[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.root[rootX] = rootY;
      } else {
        this.root[rootY] = rootX;
        this.rank[rootX]++;
      }
    }
  }
  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// Two test cases 
console.log(countCompleteComponents(6, [[0,1],[0,2],[1,2],[3,4]])) // 3
console.log(countCompleteComponents(6, [[0,1],[0,2],[1,2],[3,4],[3,5]])) // 1