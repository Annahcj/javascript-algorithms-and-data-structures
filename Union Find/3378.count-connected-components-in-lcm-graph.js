// 3378. Count Connected Components in LCM Graph
// You are given an array of integers nums of size n and a positive integer threshold.
// There is a graph consisting of n nodes with the ith node having a value of nums[i]. Two nodes i and j in the graph are connected via an undirected edge if lcm(nums[i], nums[j]) <= threshold.
// Return the number of connected components in this graph.
// A connected component is a subgraph of a graph in which there exists a path between any two vertices, and no vertex of the subgraph shares an edge with a vertex outside of the subgraph.
// The term lcm(a, b) denotes the least common multiple of a and b.


// Solution: Union Find

// 1. For every nums[i], go through every multiple <= threshold, and connect all the multiples together.
// 2. Find the number of distinct parents of every nums[i].

// By connecting multiples <= threshold, numbers that share any common multiple <= threshold will end up being in the same connected component.
// It's also possible that numbers that don't share any common multiples will end up in the same connected component.

// n = length of nums, m = threshold
// Time Complexity: O(n log(n) + m) 366ms
// Space Complexity: O(m) 99.4MB
function countComponents(nums, threshold) {
  const uf = new UnionFind(threshold + 1);
  for (let num of nums) {
    for (let multiple = num * 2; multiple <= threshold; multiple += num) {
      uf.union(num, multiple);
    }
  }
  const n = nums.length;
  const parents = new Set();
  for (let i = 0; i < n; i++) {
    parents.add(uf.find(nums[i]) ?? nums[i]);
  }
  return parents.size;
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
console.log(countComponents([2,4,8,3,9], 5)) // 4
console.log(countComponents([2,4,8,3,9,12], 10)) // 2