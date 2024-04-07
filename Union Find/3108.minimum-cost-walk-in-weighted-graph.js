// 3108. Minimum Cost Walk in Weighted Graph
// There is an undirected weighted graph with n vertices labeled from 0 to n - 1.
// You are given the integer n and an array edges, where edges[i] = [u[i], v[i], w[i]] indicates that there is an edge between vertices u[i] and v[i] with a weight of w[i].
// A walk on a graph is a sequence of vertices and edges. The walk starts and ends with a vertex, and each edge connects the vertex that comes before it and the vertex that comes after it. It's important to note that a walk may visit the same edge or vertex more than once.
// The cost of a walk starting at node u and ending at node v is defined as the bitwise AND of the weights of the edges traversed during the walk. In other words, if the sequence of edge weights encountered during the walk is w0, w1, w2, ..., wk, then the cost is calculated as w0 & w1 & w2 & ... & wk, where & denotes the bitwise AND operator.
// You are also given a 2D array query, where query[i] = [s[i], t[i]]. For each query, you need to find the minimum cost of the walk starting at vertex s[i] and ending at vertex t[i]. If there exists no such walk, the answer is -1.
// Return the array answer, where answer[i] denotes the minimum cost of a walk for query i.


// Solution: Union Find

// It's optimal to visit as many edges as possible to lower the total bitwise AND.
// Because we can visit nodes and edges more than once, nodes within the same connected component can take the total bitwise AND of ALL edges within that connected component.
// Any pair of nodes within the same connected component will have the same cost.

// Use union find to get the connected groups and find the bitwise AND cost for the group.
// Note: If the two nodes of the query are equal, the answer is 0 because we are already at the target.

// n = number of nodes, m = number of edges, k = number of queries
// Time Complexity: O(n + m + q) 303ms
// Space Complexity: O(n + m + q) 91.5MB
var minimumCost = function(n, edges, query) {
  let uf = new UnionFind(n), weights = Array(n).fill(-1);
  for (let [u, v, weight] of edges) {
    uf.union(u, v);
    weights[u] = weights[u] === -1 ? weight : weights[u] & weight; // only need to keep track of edges from u -> v and not v -> u because they will be part of the same connected component and will be duplicated
  }
  let groupCost = {};
  for (let i = 0; i < n; i++) {
    let parent = uf.find(i);
    groupCost[parent] = groupCost[parent] === undefined ? weights[i] : groupCost[parent] & weights[i];
  }
  let ans = [];
  for (let [s, t] of query) {
    if (!uf.isConnected(s, t)) ans.push(-1);
    else if (s === t) ans.push(0);
    else ans.push(groupCost[uf.find(s)]);
  }
  return ans;
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
console.log(minimumCost(5, [[0,1,7],[1,3,7],[1,2,1]], [[0,3],[3,4]])) // [1,-1]
console.log(minimumCost(3, [[0,2,7],[0,1,15],[1,2,6],[1,2,1]], [[1,2]])) // [0]