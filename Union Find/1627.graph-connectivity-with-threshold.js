// 1627. Graph Connectivity With Threshold
// We have n cities labeled from 1 to n. Two different cities with labels x and y are directly connected by a bidirectional road if and only if x and y share a common divisor strictly greater than some threshold. More formally, cities with labels x and y have a road between them if there exists an integer z such that all of the following are true:
  // x % z == 0,
  // y % z == 0, and
  // z > threshold.
// Given the two integers, n and threshold, and an array of queries, you must determine for each queries[i] = [ai, bi] if cities ai and bi are connected directly or indirectly. (i.e. there is some path between them).
// Return an array answer, where answer.length == queries.length and answer[i] is true if for the ith query, there is a path between ai and bi, or answer[i] is false if there is no path.


// Solution: Union Find

// Keep track of connected cities using union find. 
// Use path compression and union by size to bring the time complexity down to O(n).

// The key is to connect each city i (>= threshold) with every multiple of i (<= n).
  // This covers all cases including (4,6), where 4 and 6 are both a multiple of 2, and will therefore be connected.
  // This approach works because the cities are in range 1 to n, so all possible allowed divisors are covered.

// n = number of cities, m = number of queries
// Time Complexity: O(n + m) 261ms
  // Taking the multiples of each city i takes O(n/2) + O(n/3) + O(n/4) + ...
// Space Complexity: O(n + m) 63.6MB
var areConnected = function(n, threshold, queries) {
  let uf = new UnionFind(n + 1);
  for (let i = threshold + 1; i <= n; i++) {
    for (let j = i + i; j <= n; j += i) {
      uf.union(i, j);
    }
  }
  let m = queries.length, answer = Array(m);
  for (let i = 0; i < m; i++) {
    answer[i] = uf.isConnected(queries[i][0], queries[i][1]);
  }
  return answer;
};

class UnionFind {
  constructor(size) {
    this.root = Array(size);
    this.rank = Array(size);
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
    return true;
  }
  isConnected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// Two test cases
console.log(areConnected(6, 2, [[1,4],[2,5],[3,6]])) // [false,false,true]
console.log(areConnected(6, 0, [[4,5],[3,4],[3,2],[2,6],[1,3]])) // [true,true,true,true,true]