// 2421. Number of Good Paths
// There is a tree (i.e. a connected, undirected graph with no cycles) consisting of n nodes numbered from 0 to n - 1 and exactly n - 1 edges.
// You are given a 0-indexed integer array vals of length n where vals[i] denotes the value of the ith node. You are also given a 2D integer array edges where edges[i] = [ai, bi] denotes that there exists an undirected edge connecting nodes ai and bi.
// A good path is a simple path that satisfies the following conditions:
  // 1. The starting node and the ending node have the same value.
  // 2. All nodes between the starting node and the ending node have values less than or equal to the starting node (i.e. the starting node's value should be the maximum value along the path).
// Return the number of distinct good paths.
// Note that a path and its reverse are counted as the same path. For example, 0 -> 1 is considered to be the same as 1 -> 0. A single node is also considered as a valid path.


// Solution: Union Find

// An important detail is that there are exactly n - 1 edges.
// This means it is like a tree.

// Use union find to keep track of nodes that are connected to each other.
// Process nodes with smaller values first.
// When we process an edge, connect the two nodes x and y.
  // Add to the number of good paths: count[rootX][val] * count[rootY][val]
  // Set the root of y to be the root of x (union).
  // Update the count of count[node1][val] to be count[rootX][val] * count[rootY][val].
    // (We can have count[rootX][val] * count[rootY][val] pairs of nodes as the starting and ending nodes of a path)
  // Important note: because it is like a tree, there is only one path from one node to another.

// Keep track of the count of node values for each connected group.
// For each group, we only need to keep track of the count of the value we are currently processing, since we process values from smallest to largest, we won't need the counts of smaller values any more.

// n = number of nodes, m = number of edges
// Time Complexity: O(n + m log(m)) 982ms
// Space Complexity: O(n + m) 104.6MB
var numberOfGoodPaths = function(vals, edges) {
  let n = vals.length;
  edges = edges.map(([x, y]) => [Math.max(vals[x], vals[y]), x, y]).sort((a, b) => a[0] - b[0]);
  let count = Array(n).fill(0).map((_, i) => ({[vals[i]]: 1})); // initial counts

  let uf = new UnionFind(n), paths = n;
  for (let [val, x, y] of edges) {
    let rootX = uf.find(x), rootY = uf.find(y);
    let countX = count[rootX][val] || 0, countY = count[rootY][val] || 0;
    paths += countX * countY;
    uf.root[rootY] = rootX;
    count[rootX] = {[val]: countX + countY};
  }
  return paths;
};

class UnionFind {
  constructor(size) {
    this.root = Array(size).fill(0).map((_, i) => i);
  }
  find(x) {
    if (this.root[x] === x) return x;
    return this.root[x] = this.find(this.root[x]);
  }
}

// Three test cases
console.log(numberOfGoodPaths([1,3,2,1,3], [[0,1],[0,2],[2,3],[2,4]])) // 6
console.log(numberOfGoodPaths([1,1,2,2,3], [[0,1],[1,2],[2,3],[2,4]])) // 7
console.log(numberOfGoodPaths([1], [])) // 1