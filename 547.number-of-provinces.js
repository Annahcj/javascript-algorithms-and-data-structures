// 547. Number of Provinces
// There are n cities. Some of them are connected, while some are not. If city a is connected directly with city b, and city b is connected directly with city c, then city a is connected indirectly with city c.
// A province is a group of directly or indirectly connected cities and no other cities outside of the group.
// You are given an n x n matrix isConnected where isConnected[i][j] = 1 if the ith city and the jth city are directly connected, and isConnected[i][j] = 0 otherwise.
// Return the total number of provinces.


// Solution 1: BFS

// Logic:
// We loop through isConnected, if we haven't been there before, bfs through isConnected[i] and ALL its connections and all their connections.
// If we haven't been to isConnected[i], increase the count.

// Algorithm
// keep a province count 'provinces', let visited be a hashmap to check whether we have been to a node yet
// Loop through isConnected (pointer = i)
  // if i has not been visited yet
    // call bfs for i
    // increment provinces by one
// bfs: (idx)
  // set a queue to [idx]
  // loop while queue is not empty *
    // let next = [] (instead of shifting from queue, we pop from queue and reassign queue to next for each level)
    // loop while queue is not empty **
      // pop the last item from queue, save it in 'curr'
      // mark curr as visited
      // loop through isConnected[curr] (pointer = i)
        // if isConnected[curr][i] is 1 (is a connection) AND we haven't visited i before
          // push i into next
    // **
    // update queue to be next
  // *

// n = length of isConnected / number of cities
// Time Complexity: O(n^2) 80ms
// Space Complexity: O(n) 41.3MB

var findCircleNum = function(isConnected) {
  let provinces = 0, visited = {};
  for (var i = 0; i < isConnected.length; i++) {
    if (!visited[i]) {
      bfs(i);
      provinces++;
    }
  }
  return provinces;
  function bfs(idx) {
    let queue = [idx];
    while (queue.length) {
      let next = [];
      while (queue.length) {
        let curr = queue.pop();
        visited[curr] = true;
        for (var i = 0; i < isConnected[curr].length; i++) {
          let cell = isConnected[curr][i];
          if (cell === 1 && !visited[i]) {
            next.push(i);
          }
        }
      }
      queue = next;
    }
  }
};
  

// Solution 2: Union Find

// UnionFind:
// (Using union by rank and path compression)
// Initially set a 'count' variable equal to size (the amount of cities)

// union: (x, y)
// If x is not equal to y (meaning we are connecting two cities), decrement count by one.

// getCount:
  // Return this.count

// initiate a new unionfind -> uf, with the size of isConnected.length
// Loop through each cell in the matrix (i,j)
  // if isConnected[i][j] is 1 (an edge)
    // call uf.union(i, j) 

  // return uf.getCount


// n = length of isConnected / number of cities
// Time Complexity: O(n)
// Space Complexity: O(n)

var findCircleNum = function(isConnected) {
  let n = isConnected.length;
  let uf = new UnionFind(n);
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      if (isConnected[i][j] === 1) {
        uf.union(i, j);
      }
    }
  }
  return uf.getCount();
};

class UnionFind {
  constructor(size) {
    this.root = Array(size);
    this.rank = Array(size);
    this.count = size;
    for (var i = 0; i < size; i++) {
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
      this.count--;
    }
  }
  getCount() {
    return this.count;
  }
}

// Three test cases to run function on
console.log(findCircleNum([[1,0,0,1],[0,1,1,0],[0,1,1,1],[1,0,1,1]])) // 1
console.log(findCircleNum([[1,1,0],[1,1,0],[0,0,1]])) // 2
console.log(findCircleNum([[1,0,0],[0,1,0],[0,0,1]])) // 3