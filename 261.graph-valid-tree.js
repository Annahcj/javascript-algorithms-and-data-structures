// 261. Graph Valid Tree
// You have a graph of n nodes labeled from 0 to n - 1. You are given an integer n and a list of edges where edges[i] = [ai, bi] indicates that there is an undirected edge between nodes ai and bi in the graph.
// Return true if the edges of the given graph make up a valid tree, and false otherwise.


// Solution 1: Graph Theory / DFS Iterative

// Create an adjacency list from the edges, since the edges are undirected, add both ways (edge[0] -> edge[1], edge[1] -> edge[0])
// Use a stack to dfs through the graph, starting with 0.
// Keep a 'parent' map to keep track of each node's parent
// Set -1 as the parent for 0.
// Loop while the stack is not empty
  // curr = stack.pop
  // loop through each neighbor in adjacencyList[curr]
    // if parent of curr is equal to neighbor, continue. (skip over trivial cycles)
    // if neighbor already has a parent, return false. (a node can't have more than one parent)
    // push neighbor into stack
    // set the parent of neighbor to be curr
// return true if the size of parent is equal to n, otherwise false.

// Time Complexity: O(N + E) 84ms
// Space Complexity: O(N + E) 42.5MB
var validTree = function(n, edges) {
  let adjacencyList = {};
  for (var i = 0; i < n; i++) {
    adjacencyList[i] = [];
  } 
  for (var edge of edges) {
    adjacencyList[edge[0]].push(edge[1]);
    adjacencyList[edge[1]].push(edge[0]);
  }
  let stack = [0];
  let parent = new Map();
  parent.set(0, -1);
  while (stack.length) {
    let curr = stack.pop();
    for (var neighbor of adjacencyList[curr]) {
      if (parent.get(curr) === neighbor) {
        continue;
      }
      if (parent.has(neighbor)) {
        return false;
      }
      stack.push(neighbor);
      parent.set(neighbor, curr);
    }
  }
  return parent.size === n;
};

// Solution 2: Advanced Graph Theory / DFS Iterative

// A graph is valid if
  // 1. It has exactly n - 1 edges. 
  // 2. It is fully connected.

// To check this, we can return false at the beginning if the number of edges is not equal to n - 1.
// Then, we just need to check whether the graph is fully connected or not.
// Create an adjacency list for the edges
// Use a stack to dfs through the graph, starting from 0.
// Keep a set 'seen' to keep track of nodes we have been to. Mark 0 as seen.
// Loop while the stack is not empty,
  // curr (current) = stack.pop
  // loop through each neighbor of adjacencyList[curr]  
    // if we have already been to neighbor, continue.
    // otherwise, mark neighbor as seen, and push neighbor into the stack.

// now, we can check the size of seen.
// if the number of nodes in seen is equal to n, return true, otherwise return false.

// Time Complexity: O(N + E) 84ms
// Space Complexity: O(N + E) 41.2MB
var validTree = function(n, edges) {
  if (edges.length !== n - 1) return false;
  let adjacencyList = {};
  for (var i = 0; i < n; i++) {
    adjacencyList[i] = [];
  } 
  for (var edge of edges) {
    adjacencyList[edge[0]].push(edge[1]);
    adjacencyList[edge[1]].push(edge[0]);
  }
  let stack = [0];
  let seen = new Set;
  seen.add(0);
  while (stack.length) {
    let curr = stack.pop();
    for (var neighbor of adjacencyList[curr]) {
      if (seen.has(neighbor)) {
        continue;
      }
      stack.push(neighbor);
      seen.add(neighbor);
    }
  }
  return seen.size === n;
};


// Solution 3: Advanced Graph Theory w/ Optimized Union Find

// There must be n - 1 edges, otherwise it is bound to be invalid.
// UnionFind:
  // Union: (x, y)
    // If x and y are already connected, return false.
    // Otherwise, perform union and return true.

// Time Complexity: O(n * α(n)) 80ms
// Space Complexity: O(n) 40.4MB
var validTree = function(n, edges) {
  if (edges.length !== n - 1) return false;
  let uf = new UnionFind(n);
  for (var [x, y] of edges) {
    if (!uf.union(x, y)) {
      return false;
    }
  }
  return true;
};

class UnionFind {
  constructor(size) {
    this.root = Array(size);
    this.rank = Array(size);
    for (var i = 0; i < size; i++) {
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
    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.root[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.root[rootX] = rootY;
      } else {
        this.root[rootY] = rootX;
        this.rank[rootX] += this.rank[rootY];
      }
    } else {
      return false;
    }
    return true;
  }
}

// Three test cases to run function on
console.log(validTree(4, [[0,1],[2,3]])) // false
console.log(validTree(5, [[0,1],[0,2],[0,3],[1,4]])) // true
console.log(validTree(5, [[0,1],[1,2],[2,3],[1,3],[1,4]])) // false 