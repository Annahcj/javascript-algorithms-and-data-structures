// 3532. Path Existence Queries in a Graph I
// You are given an integer n representing the number of nodes in a graph, labeled from 0 to n - 1.
// You are also given an integer array nums of length n sorted in non-decreasing order, and an integer maxDiff.
// An undirected edge exists between nodes i and j if the absolute difference between nums[i] and nums[j] is at most maxDiff (i.e., |nums[i] - nums[j]| <= maxDiff).
// You are also given a 2D integer array queries. For each queries[i] = [u[i], v[i]], determine whether there exists a path between nodes u[i] and v[i].
// Return a boolean array answer, where answer[i] is true if there exists a path between u[i] and v[i] in the ith query and false otherwise.


// Solution: Union Find

// Because nums is sorted in asc order, we know adjacent pairs of elements have the minimum possible difference.
// Hence, we only need to compare adjacent pairs of elements.
// Find the contiguous segments of nums where adjacent elements differences <= maxDiff.
// Connect these contiguous segments using union find.

// For each query (u, v), check if they are connected, in the same connected component.

// Time Complexity: O(n) 76ms
// Space Complexity: O(n) 98MB
function pathExistenceQueries(n, nums, maxDiff, queries) {
  const uf = new UnionFind(n);
  for (let i = 1; i < n; i++) {
    if (nums[i] - nums[i - 1] <= maxDiff) {
      uf.union(i - 1, i);
    }
  } 
  const ans = [];
  for (let [u, v] of queries) {
    ans.push(uf.isConnected(u, v));
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
console.log(pathExistenceQueries(2, [1,3], 1, [[0,0],[0,1]])) // [true,false]
console.log(pathExistenceQueries(4, [2,5,6,8], 2, [[0,1],[0,2],[1,3],[2,3]])) // [false,false,true,true]