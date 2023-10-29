// 1319. Number of Operations to Make Network Connected
// There are n computers numbered from 0 to n-1 connected by ethernet cables connections forming a network where connections[i] = [a, b] represents a connection between computers a and b. Any computer can reach any other computer directly or indirectly through the network.
// Given an initial computer network connections. You can extract certain cables between two directly connected computers, and place them between any pair of disconnected computers to make them directly connected. Return the minimum number of times you need to do this in order to make all the computers connected. If it's not possible, return -1. 


// Solution 1: Recursive DFS

// The answer is the number of connected components - 1.

// If the number of connections is less than n - 1, it is impossible to connect all computers.

// 1. Construct a graph from connections
// 2. DFS to find the number of connected components

// Time Complexity: O(n + m) 180ms
// Space Complexity: O(n + m) 68.5MB
var makeConnected = function(n, connections) {
  if (connections.length < n - 1) return -1;
  let graph = {};
  for (let i = 0; i < n; i++) graph[i] = [];
  for (let [x, y] of connections) {
    graph[x].push(y);
    graph[y].push(x);
  }
  let seen = Array(n);
  let connected = 0;
  for (let i = 0; i < n; i++) connected += dfs(i);
  return connected - 1;

  function dfs(node) {
    if (seen[node]) return 0;
    seen[node] = 1;
    for (let neighbor of graph[node]) {
      dfs(neighbor);
    }
    return 1;
  }
};

// Solution 2: Union Find

// Loop through each [x, y] in connections and union x and y.
// Set a total count 'connected' to n.
// In the union function, each time two components are not equal, decrement the total count by one.
// Return the total count - 1.

// Time Complexity: O(m) 156ms
// Space Complexity: O(n) 53MB
var makeConnected = function(n, connections) {
  if (connections.length < n - 1) return -1;
  let uf = new UnionFind(n);
  for (let [x, y] of connections) uf.union(x, y);
  return uf.connected - 1;
};

class UnionFind {
  constructor(size) {
    this.connected = size;
    this.root = Array(size);
    this.rank = Array(size)
    for (let i = 0; i < size; i++) {
      this.root[i] = i;
      this.rank[i] = 1;
    }
  }
  find(x) {
    if (this.root[x] === x) {
      return x;
    }
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
        this.rank[rootX]++;
      }
      this.connected--;
    }
  }
}

// Four test cases
console.log(makeConnected(4, [[0,1],[0,2],[1,2]])) // 1
console.log(makeConnected(6, [[0,1],[0,2],[0,3],[1,2],[1,3]])) // 2
console.log(makeConnected(6, [[0,1],[0,2],[0,3],[1,2]])) // -1
console.log(makeConnected(5, [[0,1],[0,2],[3,4],[2,3]])) // 0