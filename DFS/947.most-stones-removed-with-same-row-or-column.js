// 947. Most Stones Removed with Same Row or Column
// On a 2D plane, we place n stones at some integer coordinate points. Each coordinate point may have at most one stone.
// A stone can be removed if it shares either the same row or the same column as another stone that has not been removed.
// Given an array stones of length n where stones[i] = [xi, yi] represents the location of the ith stone, return the largest possible number of stones that can be removed.


// Overview: The problem can be simplified to finding the number of connected components - connected by the same row or column.
// The solution is the number of stones - the number of connected components.
// In one connected component, we can always remove all the stones except one.
// Proof: Think about performing DFS from one stone to all its connected stones. 
  // If we remove the stones in reverse order from the last stone found to the starting stone, 
  // we can always remove all stones except the starting stone.

// Now, we need to find the number of connected components. This can be done in two ways, union find or DFS.


// Solution 1: Union Find

// Connect each pair of stones that share the same row or column. Checking each pair will take O(n^2).
// Keep track of the number of connected components in the union find.

// Time Complexity: O(n^2) 262ms
// Space Complexity: O(n) 49.2MB
var removeStones = function(stones) {
  let n = stones.length, uf = new UnionFind(n);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let [x1, y1] = stones[i], [x2, y2] = stones[j];
      if (x1 === x2 || y1 === y2) uf.union(i, j);
    }
  } 
  return n - uf.size;
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
    this.size--;
    if (this.rank[rootX] < this.rank[rootY]) this.root[rootX] = rootY;
    else if (this.rank[rootX] > this.rank[rootY]) this.root[rootY] = rootX;
    else {
      this.root[rootY] = rootX;
      this.rank[rootX]++;
    }
    return true;
  }
}

// Solution 2: Recursive DFS

// 1. Use two graphs - rowGraph and columnGraph to group stones by their row and column. This can speed it up slightly.
// 2. Recursively DFS from each stone. Keep track of stones we have already seen to avoid visiting more than once.

// Time Complexity: O(n^2) 166ms
// Space Complexity: O(n) 50.4MB
var removeStones = function(stones) {
  let n = stones.length, rowGraph = {}, colGraph = {};
  for (let i = 0; i < n; i++) {
    let [x, y] = stones[i];
    if (!rowGraph[x]) rowGraph[x] = [];
    if (!colGraph[y]) colGraph[y] = [];
    rowGraph[x].push(i);
    colGraph[y].push(i);
  }
  let seen = Array(n).fill(0), count = 0;
  for (let i = 0; i < n; i++) {
    let res = dfs(i);
    count += res;
  }
  return n - count;
  
  function dfs(idx) {
    if (seen[idx]) return 0;
    let [row, col] = stones[idx];
    seen[idx] = 1;
    for (let nei of rowGraph[row]) dfs(nei);
    for (let nei of colGraph[col]) dfs(nei);
    return 1;
  }
};

// Three test cases 
console.log(removeStones([[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]])) // 5
console.log(removeStones([[0,0],[0,2],[1,1],[2,0],[2,2]])) // 3
console.log(removeStones([[0,0]])) // 0