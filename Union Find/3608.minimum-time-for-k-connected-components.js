// 3608. Minimum Time for K Connected Components
// You are given an integer n and an undirected graph with n nodes labeled from 0 to n - 1. This is represented by a 2D array edges, where edges[i] = [ui, vi, timei] indicates an undirected edge between nodes ui and vi that can be removed at timei.
// You are also given an integer k.
// Initially, the graph may be connected or disconnected. Your task is to find the minimum time t such that after removing all edges with time <= t, the graph contains at least k connected components.
// Return the minimum time t.
// A connected component is a subgraph of a graph in which there exists a path between any two vertices, and no vertex of the subgraph shares an edge with a vertex outside of the subgraph.


// Solution: Reverse Edges & Union Find

// The larger the t is, the more smaller weighted edges are removed, and the more connected components there will be.

// Instead, think about it in reverse.
// We want to start off with n disconnected components.
// From there, we add back the largest weighted edges one-by-one, time decreases as we go.
// Use union find to connect the components as we add the edges.
// Return the smallest time where we have at least k connected components.

// Note: 
  // If we reach the end, adding back all edges and there are still >= k connected components,
  // return 0 since we don't remove any edges.

// n = number of nodes, m = number of edges
// Time Complexity: O(m log(m) + n) 134ms
// Space Complexity: O(n) 93MB
function minTime(n, edges, k) {
  const uf = new UnionFind(n);
  edges.sort((a, b) => b[2] - a[2]);
  for (let [u, v, time] of edges) {
    uf.union(u, v);
    if (uf.size < k) {
      // adding back this edge gives us less than k connected components,
      // so we have to stop here. this removes all edges with a smaller or equal time, including this current one.
      return time;
    }
  }
  return 0; 
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

// Two test cases
console.log(minTime(2, [[0,1,3]], 2)) // 3
console.log(minTime(3, [[0,1,2],[1,2,4]], 3)) // 4