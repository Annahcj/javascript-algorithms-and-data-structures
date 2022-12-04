// 2492. Minimum Score of a Path Between Two Cities
// You are given a positive integer n representing n cities numbered from 1 to n. You are also given a 2D array roads where roads[i] = [a[i], b[i], distance[i]] indicates that there is a bidirectional road between cities a[i] and b[i] with a distance equal to distancei. The cities graph is not necessarily connected.
// The score of a path between two cities is defined as the minimum distance of a road in this path.
// Return the minimum possible score of a path between cities 1 and n.
// Note:
  // A path is a sequence of roads between two cities.
  // It is allowed for a path to contain the same road multiple times, and you can visit cities 1 and n multiple times along the path.
  // The test cases are generated such that there is at least one path between 1 and n.


// Solution: Union Find

// Take the minimum distance out of all edges directly and indirectly connected to node 1 (node 1 is always connected to node n, so we only need to check connection to node 1)

// 1. Keep track of the minimum distance for each node, where minDist[i] = minimum distance for all edges from node i.
// 2. Use union find to connect nodes.
// 3. Get the minimum distance out of all nodes which are connected to node 1.

// n = number of nodes, m = number of edges
// Time Complexity: O(n + m) 336ms
// Space Complexity: O(n) 82.9MB
var minScore = function(n, roads) {
  let uf = new UnionFind(n + 1);
  let minDist = Array(n + 1).fill(Infinity);
  for (let [a, b, distance] of roads) {
    minDist[a] = Math.min(minDist[a], distance);
    minDist[b] = Math.min(minDist[b], distance);
    uf.union(a, b);
  }
  
  let ans = Infinity;
  for (let i = 1; i <= n; i++) {
    if (uf.find(i) === uf.find(1)) {
      ans = Math.min(ans, minDist[i]);
    }
  }
  return ans;
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
console.log(minScore(4, [[1,2,9],[2,3,6],[2,4,5],[1,4,7]])) // 5
console.log(minScore(4, [[1,2,2],[1,3,4],[3,4,7]])) // 2