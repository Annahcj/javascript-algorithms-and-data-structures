// 1786. Number of Restricted Paths From First to Last Node
// There is an undirected weighted connected graph. You are given a positive integer n which denotes that the graph has n nodes labeled from 1 to n, and an array edges where each edges[i] = [ui, vi, weighti] denotes that there is an edge between nodes ui and vi with weight equal to weighti.
// A path from node start to node end is a sequence of nodes [z0, z1, z2, ..., zk] such that z0 = start and zk = end and there is an edge between zi and zi+1 where 0 <= i <= k-1.
// The distance of a path is the sum of the weights on the edges of the path. Let distanceToLastNode(x) denote the shortest distance of a path between node n and node x. A restricted path is a path that also satisfies that distanceToLastNode(zi) > distanceToLastNode(zi+1) where 0 <= i <= k-1.
// Return the number of restricted paths from node 1 to node n. Since that number may be too large, return it modulo 10^9 + 7.


// Solution: Dijkstra & DFS w/ Memoization

// 1. Record shortest dist from node n to each node using dijkstra's algorithm
  // dist[node] = shortest distance from node to n - 1
  
// 2. DFS with memoization to get the number of ways with valid paths
  // dfs(node) = number of valid ways from node to n - 1
  // memoize the result for each node to avoid recalculation

// V = number of nodes, E = number of edges
// Time Complexity: O(E log(V) + V^2) 762ms
// Space Complexity: O(V) 85.3MB
var countRestrictedPaths = function(n, edges) {
  let graph = Array(n).fill(0).map(() => []), mod = 10 ** 9 + 7;
  for (let [x, y, weight] of edges) {
    graph[x - 1].push([y - 1, weight]);
    graph[y - 1].push([x - 1, weight]);
  }
  let dist = getDist();
  let memo = Array(n).fill(-1); 
  return dfs(0);
  
  function getDist() {
    let heap = new Heap((a, b) => a[1] - b[1]);
    let dist = Array(n).fill(Infinity);
    dist[n - 1] = 0;
    heap.add([n - 1, 0]);
    
    while (!heap.isEmpty()) {
      let [node, currDist] = heap.remove();
      if (currDist > dist[node]) continue;
      for (let [nei, neiDist] of graph[node]) {
        let newDist = currDist + neiDist;
        if (newDist >= dist[nei]) continue;
        dist[nei] = newDist;
        heap.add([nei, newDist]);
      }
    }
    return dist;
  }
  
  function dfs(node) { // dfs(node) = number of valid ways from node to n - 1
    if (node === n - 1) return 1;
    if (memo[node] !== -1) return memo[node];
    
    let ans = 0;
    for (let [nei] of graph[node]) {
      if (dist[node] > dist[nei]) ans = (ans + dfs(nei)) % mod;
    }
    return memo[node] = ans;
  }
};

class Heap {
  constructor(comparator = ((a, b) => a - b)) {
    this.values = [];
    this.comparator = comparator;
    this.size = 0;
  }
  add(val) {
    this.size++;
    this.values.push(val);
    let idx = this.size - 1, parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.comparator(this.values[parentIdx], this.values[idx]) > 0) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
  }
  remove() {
    if (this.size === 0) return -1;
    this.size--;
    if (this.size === 0) return this.values.pop();
    let removedVal = this.values[0];
    this.values[0] = this.values.pop();
    let idx = 0;
    while (idx < this.size && idx < Math.floor(this.size / 2)) {
      let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      if (rightIdx === this.size) {
        if (this.comparator(this.values[leftIdx], this.values[idx]) > 0) break;
        [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
        idx = leftIdx;
      } else if (this.comparator(this.values[leftIdx], this.values[idx]) < 0 || this.comparator(this.values[rightIdx], this.values[idx]) < 0) {
        if (this.comparator(this.values[leftIdx], this.values[rightIdx]) <= 0) {
          [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
          idx = leftIdx;
        } else {
          [this.values[rightIdx], this.values[idx]] = [this.values[idx], this.values[rightIdx]];
          idx = rightIdx;
        }
      } else {
        break;
      }
    }
    return removedVal;
  }
  top() {
    return this.values[0];
  }
  isEmpty() {
    return this.size === 0;
  }
}

// Two test cases
console.log(countRestrictedPaths(5, [[1,2,3],[1,3,3],[2,3,1],[1,4,2],[5,2,2],[3,5,1],[5,4,10]])) // 3
console.log(countRestrictedPaths(7, [[1,3,1],[4,1,2],[7,3,4],[2,5,3],[5,6,1],[6,7,2],[7,5,3],[2,6,4]])) // 1