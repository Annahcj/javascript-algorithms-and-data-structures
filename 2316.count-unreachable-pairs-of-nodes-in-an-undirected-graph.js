// 2316. Count Unreachable Pairs of Nodes in an Undirected Graph
// You are given an integer n. There is an undirected graph with n nodes, numbered from 0 to n - 1. You are given a 2D integer array edges where edges[i] = [ai, bi] denotes that there exists an undirected edge connecting nodes ai and bi.
// Return the number of pairs of different nodes that are unreachable from each other.


// Solution: Union Find

// Total number of pairs: (n-1) + (n-2) + (n-3) + ... + 1  
// Use union find to get the size of each connected group.
// Subtract the count of connected pairs of each group from the total pairs count: (group count - 1) + (group count - 2) + (group count - 3) + ... + 1
  // We can find the size of each group by finding the unique roots, then finding the size for each.

// Time Complexity: O(n + m) 338ms
// Space Complexity: O(n) 95.8MB
var countPairs = function(n, edges) {
  let totalPairs = getPairs(n), uf = new UnionFind(n);
  for (let [a, b] of edges) {
    uf.union(a, b);
  }
  let roots = new Set();
  for (let i = 0; i < n; i++) {
    roots.add(uf.find(i));
  }
  for (let root of roots) {
    let groupSize = uf.size[root];
    totalPairs -= getPairs(groupSize);
  }
  return totalPairs;
  
  function getPairs(n) {
    return (n - 1) * n / 2;
  }
};

class UnionFind {
  constructor(size) {
    this.root = Array(size);
    this.rank = Array(size);
    this.size = Array(size); // size[i] = size of group i
    for (let i = 0; i < size; i++) {
      this.root[i] = i;
      this.rank[i] = 1;
      this.size[i] = 1;
    }
  }
  find(x) {
    if (this.root[x] === x) return x;
    return this.root[x] = this.find(this.root[x]);
  }
  union(x, y) {
    let rootX = this.find(x), rootY = this.find(y);
    if (rootX === rootY) return false;
    if (this.rank[rootX] < this.rank[rootY]) {
      this.root[rootX] = rootY;
      this.size[rootY] += this.size[rootX];
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.root[rootY] = rootX;
      this.size[rootX] += this.size[rootY];
    } else {
      this.root[rootY] = rootX;
      this.rank[rootX]++;
      this.size[rootX] += this.size[rootY];
    }
    return true;
  }
}

// Two test cases to run function on
console.log(countPairs(3, [[0,1],[0,2],[1,2]])) // 0
console.log(countPairs(7, [[0,2],[0,5],[2,4],[1,6],[5,4]])) // 14