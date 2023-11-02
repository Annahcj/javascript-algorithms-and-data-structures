// 1101. The Earliest Moment When Everyone Become Friends
// There are n people in a social group labeled from 0 to n - 1. You are given an array logs where logs[i] = [timestampi, xi, yi] indicates that xi and yi will be friends at the time timestampi.
// Friendship is symmetric. That means if a is friends with b, then b is friends with a. Also, person a is acquainted with a person b if a is friends with b, or a is a friend of someone acquainted with b.
// Return the earliest time for which every person became acquainted with every other person. If there is no such earliest time, return -1.


// Solution: Optimized Union Find

// First, sort logs in asc order based on the timestamps.
// Initiate a new UnionFind with size n
// Then, loop through [time, x, y] in logs
  // union x and y
  // if uf.count is 1, return time.
// If loop finishes, return -1.

// UnionFind
  // Keep a count variable, initially set to size (n)
  // Union:
    // If two friends are not connected, union them and decrease count by one.
    
// Time Complexity: O(n log(n)) sorting is n log(n), unionfind is O(n α(n)), or O(n) 92ms
// Space Complexity: O(n) 42.2MB
var earliestAcq = function(logs, n) {
  let uf = new UnionFind(n);
  logs = logs.sort((a, b) => a[0] - b[0]);
  for (let [time, x, y] of logs) {
    uf.union(x, y);
    if (uf.count === 1) return time;
  }
  return -1;
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
      this.count--;
    }
  }
}

// Two test cases 
console.log(earliestAcq([[20190101,0,1],[20190104,3,4],[20190107,2,3],[20190211,1,5],[20190224,2,4],[20190301,0,3],[20190312,1,2],[20190322,4,5]], 6)) // 20190301
console.log(earliestAcq([[0,2,0],[1,0,1],[3,0,3],[4,1,2],[7,3,1]], 4)) // 3