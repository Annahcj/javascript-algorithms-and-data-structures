// 1697. Checking Existence of Edge Length Limited Paths
// An undirected graph of n nodes is defined by edgeList, where edgeList[i] = [ui, vi, disi] denotes an edge between nodes ui and vi with distance disi. Note that there may be multiple edges between two nodes.
// Given an array queries, where queries[j] = [pj, qj, limitj], your task is to determine for each queries[j] whether there is a path between pj and qj such that each edge on the path has a distance strictly less than limitj .
// Return a boolean array answer, where answer.length == queries.length and the jth value of answer is true if there is a path for queries[j] is true, and false otherwise.


// Solution: Union Find & Sorting

// Use union find to keep track of the connection of nodes.

// 1. Sort edgeList by distance in asc order.
// 2. Sort queries by limit in asc order.
// 3. Process the queries that are in sorted order
  // Go through each edge where the distance is less than the current query's limit and connect the pairs of nodes.
  // If the two nodes are connected after using all the edges with a distance less than limit, set res[i] to true, otherwise false.

// n = number of nodes, m = number of edges, k = number of queries
// Time Complexity: O(n + m log(m) + k log(k)) 683ms
// Space Complexity: O(n) 108.3MB
var distanceLimitedPathsExist = function(n, edgeList, queries) {
  edgeList.sort((a, b) => a[2] - b[2]);
  queries = queries.map((query, idx) => [...query, idx]).sort((a, b) => a[2] - b[2]);
  
  let uf = new UnionFind(n), i = 0, res = Array(queries.length);
  for (let [p, q, limit, index] of queries) {
    while (i < edgeList.length && edgeList[i][2] < limit) {
      let [u, v] = edgeList[i++];
      uf.union(u, v);
    }
    res[index] = uf.isConnected(p, q);
  }
  return res;
};
  
class UnionFind {
  constructor(size) {
    this.size = size;
    this.rank = Array(size);
    this.root = Array(size);
    for (let i = 0; i < size; i++) {
      this.rank[i] = 1;
      this.root[i] = i;
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
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.root[rootY] = rootX;
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

// Two test cases to run function on
console.log(distanceLimitedPathsExist(3, [[0,1,2],[1,2,4],[2,0,8],[1,0,16]], [[0,1,2],[0,2,5]])) // [false, true]
console.log(distanceLimitedPathsExist(5, [[0,1,10],[1,2,5],[2,3,9],[3,4,13]], [[0,4,14],[1,4,13]])) // [true, false]