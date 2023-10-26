// 323. Number of Connected Components in an Undirected Graph
// You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph.
// Return the number of connected components in the graph.


// Solution: Optimized Union Find

// Keep a count in the union find constructor initially set to n (the number of vertices),
// each time union is performed on two unconnected components, decrease count by one.
// Return the count at the end.

// E = edges, V = vertices
// Time Complexity: O(E * α(n)) 92ms
// Space Complexity: O(V) 42.8MB
var countComponents = function(n, edges) {
  let uf = new UnionFind(n);
  for (var [x, y] of edges) {
    uf.union(x, y);
  }
  return uf.count;
};

class UnionFind {
  constructor(size) {
    this.root = Array(size);
    this.rank = Array(size);
    this.count = size;
    for (var i = 0; i < size; i++) {
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
    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.root[rootX] = rootY;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.root[rootY] = rootX;
      } else {
        this.root[rootY] = rootX;
        this.rank[rootX] += this.rank[rootY];
      }
      this.count--;
    }
  }
}

// Two test cases to run function on
console.log(countComponents(5, [[0,1],[1,2],[3,4]])) // 2
console.log(countComponents(5, [[0,1],[1,2],[2,3],[3,4]])) // 1