// 3607. Power Grid Maintenance
// You are given an integer c representing c power stations, each with a unique identifier id from 1 to c (1‑based indexing).
// These stations are interconnected via n bidirectional cables, represented by a 2D array connections, where each element connections[i] = [ui, vi] indicates a connection between station ui and station vi. Stations that are directly or indirectly connected form a power grid.
// Initially, all stations are online (operational).
// You are also given a 2D array queries, where each query is one of the following two types:
  // [1, x]: A maintenance check is requested for station x. If station x is online, it resolves the check by itself. If station x is offline, the check is resolved by the operational station with the smallest id in the same power grid as x. If no operational station exists in that grid, return -1.
  // [2, x]: Station x goes offline (i.e., it becomes non-operational).
// Return an array of integers representing the results of each query of type [1, x] in the order they appear.
// Note: The power grid preserves its structure; an offline (non‑operational) node remains part of its grid and taking it offline does not alter connectivity.


// Solution: Union Find

// Use union find to connect the connected components.
// The key is to process the queries in reverse.
// Instead of turning stations offline, we start off with all stations offline and turn them online one-by-one.
// Note: For stations that will never be turned offline, they need to be set as online from the beginning.

// For a query of type 1, we check if the current station is online, otherwise we find the minimum station ID for the connected component.
// For type 2, we mark the station as online and update the minimum station ID for the connected component.

// Note: 
  // The same station can appear in a type 2 request more than once.
  // This means when marking stations as online in reverse, we can only do so if this is the first time this station goes offline.
  // Store the index of the first type 2 query for each node, and only mark a station as online if it's the first query index.

// n = number of nodes, m = number of connections, k = number of queries
// Time Complexity: O(n + m + q) 212ms
// Space Complexity: O(n + k) 147MB
function processQueries(n, connections, queries) {
  const uf = new UnionFind(n);
  for (let [u, v] of connections) {
    uf.union(u - 1, v - 1);
  }
  const firstTimeOffline = new Map();
  const m = queries.length;
  for (let i = 0; i < m; i++) {
    let [type, x] = queries[i];
    x--;
    if (type === 2 && !firstTimeOffline.has(x)) {
      firstTimeOffline.set(x, i);
    }
  }
  const minOnlineStation = new Map();
  const online = new Set();
  for (let i = 0; i < n; i++) {
    if (!firstTimeOffline.has(i)) {
      const parent = uf.find(i);
      minOnlineStation.set(parent, Math.min(i, minOnlineStation.get(parent) ?? Infinity));
      online.add(i);
    }
  }
  const ans = [];
  for (let i = m - 1; i >= 0; i--) {
    let [type, x] = queries[i];
    x--;
    const parent = uf.find(x);
    if (type === 1) {
      if (online.has(x)) {
        ans.push(x + 1);
      } else {
        ans.push(minOnlineStation.has(parent) ? minOnlineStation.get(parent) + 1 : -1);
      }
    } else if (firstTimeOffline.get(x) === i) {
      minOnlineStation.set(parent, Math.min(x, minOnlineStation.get(parent) ?? Infinity));
      online.add(x);
    }
  }
  return ans.reverse();
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
console.log(processQueries(5, [[1,2],[2,3],[3,4],[4,5]], [[1,3],[2,1],[1,1],[2,2],[1,2]])) // [3,2,3]
console.log(processQueries(3, [], [[1,1],[2,1],[1,1]])) // [1,-1]