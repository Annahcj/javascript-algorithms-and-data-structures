// 2867. Count Valid Paths in a Tree
// There is an undirected tree with n nodes labeled from 1 to n. You are given the integer n and a 2D integer array edges of length n - 1, where edges[i] = [ui, vi] indicates that there is an edge between nodes ui and vi in the tree.
// Return the number of valid paths in the tree.
// A path (a, b) is valid if there exists exactly one prime number among the node labels in the path from a to b.
// Note that:
  // The path (a, b) is a sequence of distinct nodes starting with node a and ending with node b such that every two adjacent nodes in the sequence share an edge in the tree.
  // Path (a, b) and path (b, a) are considered the same and counted only once.


// Solution: Union Find

// Use node 1 as the root of the tree.

// 1. Go through each edge that connects two non-prime nodes and connect the components using union find.
// 2. Traverse the tree from the root and for each prime node,
  // a. Find the parent node and get the size of the connected component for the parent node.
  // b. Find the sizes of the connected component for each child node (non-parent neighbor).
  // c. Calculate the total paths:
    // Parent to child: parent size * sum of children sizes
    // Child to child: Go through each child group -> group size * remaining sum of sizes

// n = number of nodes, m = number of edges
// Time Complexity: O(n log log(n) * m) 1744ms
// Space Complexity: O(n + m) 155.1MB
var countPaths = function(n, edges) {
  let isPrime = getPrimes(n);
  let graph = Array(n + 1).fill(0).map(() => []);
  let uf = new UnionFind(n + 1);
  for (let [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
    if (isPrime[u] || isPrime[v]) continue;
    uf.union(u, v);
  }

  let queue = [1], seen = Array(n + 1).fill(false);
  seen[1] = true;
  let paths = 0;
  while (queue.length) {
    let node = queue.shift();
    let parent = -1;
    let childGroupSizes = [];
    for (let nei of graph[node]) {
      if (seen[nei]) { // parent
        if (!isPrime[nei]) parent = nei;
      } else {
        if (!isPrime[nei]) childGroupSizes.push(uf.getSize(nei));
        seen[nei] = true;
        queue.push(nei);
      }
    }
    if (isPrime[node]) {
      let childNodesSum = childGroupSizes.reduce((sum, size) => sum + size, 0);
    paths += childNodesSum; // current node -> child node
      if (parent !== -1) {
        let parentsGroupSize = uf.getSize(parent);
        paths += parentsGroupSize * childNodesSum; // parent node -> current node's child
        paths += parentsGroupSize; // parent node -> current node 
      }
      for (let size of childGroupSizes) {
        childNodesSum -= size;
        let childPairs = size * childNodesSum; // child node -> child node from different groups
        paths += childPairs;
      }
    }
  }
  return paths;
};
  
function getPrimes(n) {
  let isPrime = Array(n + 1).fill(true); 
  for (let i = 2; i <= n; i++) {
    if (!isPrime[i]) continue;
    for (let j = i * i; j <= n; j += i) { // we start from i * i instead of 2 * i since all smaller primes have already been covered
      isPrime[j] = false;
    }
  }
  isPrime[0] = false, isPrime[1] = false;
  return isPrime;
}

class UnionFind {
  constructor(size) {
    this.size = Array(size);
    this.root = Array(size);
    this.rank = Array(size);
    for (let i = 0; i < size; i++) {
      this.size[i] = 1;
      this.root[i] = i;
      this.rank[i] = 1;
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
  isConnected(x, y) {
    return this.find(x) === this.find(y);
  }
  getSize(x) {
    return this.size[this.find(x)];
  }
}

// Two test cases
console.log(countPaths(5, [[1,2],[1,3],[2,4],[2,5]])) // 4
console.log(countPaths(6, [[1,2],[1,3],[2,4],[3,5],[3,6]])) // 6