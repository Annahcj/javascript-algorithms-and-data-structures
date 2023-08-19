// 1489. Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree
// Given a weighted undirected connected graph with n vertices numbered from 0 to n - 1, and an array edges where edges[i] = [ai, bi, weighti] represents a bidirectional and weighted edge between nodes ai and bi. A minimum spanning tree (MST) is a subset of the graph's edges that connects all vertices without cycles and with the minimum possible total edge weight.
// Find all the critical and pseudo-critical edges in the given graph's minimum spanning tree (MST). An MST edge whose deletion from the graph would cause the MST weight to increase is called a critical edge. On the other hand, a pseudo-critical edge is that which can appear in some MSTs but not all.
// Note that you can return the indices of the edges in any order.


// Solution: Kruskal's Algorithm

// Do an initial Kruskal's Algorithm to get the n edges in the MST.
// Go through each edge and run Kruskal's algorithm twice to check whether the edge is critial or pseudo-critical.
  // Critical: If the minimum cost WITHOUT using this edge is greater than the minimum, then the edge is critical.
  // Pseudo-critical: If the minimum cost using this edge is the same as the minimum and is not critical, the edge is pseudo-critical.

// n = number of nodes, m = number of edges
// Time Complexity: O(m^2) 185ms
// Space Complexity: O(n + m) 53.1MB
var findCriticalAndPseudoCriticalEdges = function(n, edges) {
  edges = edges.map((edge, index) => [...edge, index]).sort((a, b) => a[2] - b[2]);
  let minCost = kruskalsExclusive(n, edges, -1), m = edges.length;
  let critical = [], pseudoCritical = [];
  for (let i = 0; i < m; i++) {
    let originalIndex = edges[i][3];
    let minCostWithoutEdge = kruskalsExclusive(n, edges, i);
    let isCriticalEdge = minCostWithoutEdge > minCost;
    if (isCriticalEdge) {
      critical.push(originalIndex);
    } else {
      let minCostWithEdge = kruskalsInclusive(n, edges, i);
      if (minCostWithEdge === minCost) {
        pseudoCritical.push(originalIndex);
      }
    }
  }
  return [critical, pseudoCritical];
};

function kruskalsInclusive(n, edges, edgeToInclude) {
  let m = edges.length, uf = new UnionFind(n), cost = edges[edgeToInclude][2];
  uf.union(edges[edgeToInclude][0], edges[edgeToInclude][1]);
  for (let i = 0; i < m; i++) {
    if (i === edgeToInclude) continue;
    let [a, b, weight] = edges[i];
    if (!uf.isConnected(a, b)) {
      uf.union(a, b);
      cost += weight;
    }
  }
  return uf.size === 1 ? cost : Infinity;
}

function kruskalsExclusive(n, edges, edgeToExclude) {
  let m = edges.length, uf = new UnionFind(n), cost = 0;
  for (let i = 0; i < m; i++) {
    if (i === edgeToExclude) continue; 
    let [a, b, weight] = edges[i];
    if (!uf.isConnected(a, b)) {
      uf.union(a, b);
      cost += weight;
    }
  }
  return uf.size === 1 ? cost : Infinity;
}

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
console.log(findCriticalAndPseudoCriticalEdges(6, [[0,1,1],[1,2,1],[0,2,1],[2,3,4],[3,4,2],[3,5,2],[4,5,2]])) // [[3],[1,2,3,4,5]]
console.log(findCriticalAndPseudoCriticalEdges(5, [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]])) // [[0,1],[2,3,4,5]]
console.log(findCriticalAndPseudoCriticalEdges(4, [[0,1,1],[1,2,1],[2,3,1],[0,3,1]])) // [[],[0,1,2,3]]