// 1489. Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree
// Given a weighted undirected connected graph with n vertices numbered from 0 to n - 1, and an array edges where edges[i] = [ai, bi, weighti] represents a bidirectional and weighted edge between nodes ai and bi. A minimum spanning tree (MST) is a subset of the graph's edges that connects all vertices without cycles and with the minimum possible total edge weight.
// Find all the critical and pseudo-critical edges in the given graph's minimum spanning tree (MST). An MST edge whose deletion from the graph would cause the MST weight to increase is called a critical edge. On the other hand, a pseudo-critical edge is that which can appear in some MSTs but not all.
// Note that you can return the indices of the edges in any order.


// Solution: Kruskal's Algorithm

// create two functions: kruskal and kruskalWith
// kruskal: performs kruskal's algorithm without a specific edge 
// kruskalWith: connect specified edge first, then perform kruskal's algorithm without that specified edge

// Algorithm:
// Give each edge its edge number/index (the index of the original order it was in)
// edges[i] = [nodeX, nodeY, weight, edgeNumber]
// Sort the edges by weight 
// Get the cost of building original MST "mstCost" (kruskal(-1), meaning don't skip any edges)
// Loop through each edge in edges (pointer = i)
  // mstWithout = kruskal(i) (cost of MST without using edge[i])
  // if mstWithout is bigger than mstCost, push edges[i][3] into critical
  // otherwise,
    // mstWith = kruskalWith(i) (cost of MST USING edge[i])
    // if mstWith is equal to mstCost, push edges[i][3] into pseudoCritical

// Return [critical, pseudoCritical]

// Time Complexity: O(n log(n) + n^2) 152ms
  // O(n) give each edge an edge number
  // O(n log(n)) sort the edges by weight
  // O(n^2) kruskal's algorithm for each edge
// Space Complexity: O(n) 47.9MB
var findCriticalAndPseudoCriticalEdges = function(n, edges) {
  let size = edges.length;
  for (var i = 0; i < edges.length; i++) {
    edges[i].push(i);
  }
  // edges[i] = [nodeX, nodeY, weight, edgeNumber]
  edges = edges.sort((a, b) => a[2] - b[2]);
  let critical = [], nonCritical = [];
  let mstCost = kruskal(-1, size);
  for (var i = 0; i < edges.length; i++) {
    let mstWithout = kruskal(i);
    if (mstWithout > mstCost) {
      critical.push(edges[i][3]);
    } else {
      let mstWith = kruskalWith(i);
      if (mstWith === mstCost) {
        nonCritical.push(edges[i][3]);
      }
    }
  }
  return [critical, nonCritical];

  function kruskal(index) {
    let uf = new UnionFind(n);
    let cost = 0, count = 0;
    for (var i = 0; i < edges.length; i++) {
      let [x, y, weight, idx] = edges[i];
      if (i !== index && !uf.isConnected(x, y)) {
        cost += weight;
        count++;
        uf.union(x, y);
      }
    }
    return count === n - 1 ? cost : Infinity;
  } 
  function kruskalWith(index) {
    let uf = new UnionFind(n);
    uf.union(edges[index][0], edges[index][1]);
    let cost = edges[index][2], count = 1;
    for (var i = 0; i < edges.length; i++) {
      if (i === index) continue;
      let [x, y, weight, idx] = edges[i];
      if (!uf.isConnected(x, y)) {
        cost += weight;
        count++;
        uf.union(x, y);
      }
    }
    return count === n - 1 ? cost : Infinity;
  }
};

class UnionFind {
  constructor(size) {
    this.root = Array(size);
    this.rank = Array(size);
    for (var i = 0; i < size; i++) {
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
    let rootX = this.find(x);
    let rootY = this.find(y);
    if (this.rank[rootX] > this.rank[rootY]) {
      this.root[rootY] = rootX;
    } else if (this.rank[rootX] < this.rank[rootY]) {
      this.root[rootX] = rootY;
    } else {
      this.root[rootY] = rootX;
      this.rank[rootX] += this.rank[rootY];
    }
  }
  isConnected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// Three test cases to run function on
console.log(findCriticalAndPseudoCriticalEdges(6, [[0,1,1],[1,2,1],[0,2,1],[2,3,4],[3,4,2],[3,5,2],[4,5,2]])) // [[3],[1,2,3,4,5]]
console.log(findCriticalAndPseudoCriticalEdges(5, [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]])) // [[0,1],[2,3,4,5]]
console.log(findCriticalAndPseudoCriticalEdges(4, [[0,1,1],[1,2,1],[2,3,1],[0,3,1]])) // [[],[0,1,2,3]]