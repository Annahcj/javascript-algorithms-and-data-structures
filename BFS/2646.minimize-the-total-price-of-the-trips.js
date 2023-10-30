// 2646. Minimize the Total Price of the Trips
// There exists an undirected and unrooted tree with n nodes indexed from 0 to n - 1. You are given the integer n and a 2D integer array edges of length n - 1, where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the tree.
// Each node has an associated price. You are given an integer array price, where price[i] is the price of the ith node.
// The price sum of a given path is the sum of the prices of all nodes lying on that path.
// Additionally, you are given a 2D integer array trips, where trips[i] = [starti, endi] indicates that you start the ith trip from the node starti and travel to the node endi by any path you like.
// Before performing your first trip, you can choose some non-adjacent nodes and halve the prices.
// Return the minimum total price sum to perform all the given trips.


// Solution: BFS & DFS 

// Since it's a tree, there is only one path between each pair of nodes.

// 1. For each trip, use BFS to find the path from the start node to the end node.
  // Keep track of totalPrice, where totalPrice[i] = the total price from node i across all trips.
// 2. Use DFS with memoization to find the minimum score from taking half price on non-alternate nodes.
  // Memoize each dfs(node, parentIsHalfPrice, parent).
  // If the parent is half price, then this node cannot be half price.
  // If the parent is not half price, we have two choices: either take half price or don't take half price.
  // Return the minimum price.

// n = number of nodes, m = number of trips
// Time Complexity: O(m * n^2 + n^2) 182ms
// Space Complexity: O(n) 52.6MB
var minimumTotalPrice = function(n, edges, price, trips) {
  let graph = Array(n).fill(0).map(() => []);
  for (let [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }
  let totalPrice = Array(n).fill(0);
  for (let [start, end] of trips) {
    let path = makeTrip(start, end);
    for (let node of path) {
      totalPrice[node] += price[node];
    }
  }
  let memo = new Map();
  return findLowestPrice(0, false, -1);
  
  function findLowestPrice(node, parentIsHalfPrice, parent) { // dfs with memoization to find the lowest price 
    let key = `${node},${parentIsHalfPrice},${parent}`;
    if (memo.has(key)) return memo.get(key);

    if (parentIsHalfPrice) {
      let ans = totalPrice[node];
      for (let nei of graph[node]) {
        if (nei === parent) continue;
        ans += findLowestPrice(nei, false, node);
      }
      memo.set(key, ans);
      return ans;
    }
    
    let takeHalfPrice = totalPrice[node] / 2, noHalfPrice = totalPrice[node];
    for (let nei of graph[node]) {
      if (nei === parent) continue;
      takeHalfPrice += findLowestPrice(nei, true, node);
      noHalfPrice += findLowestPrice(nei, false, node);
    }
    let ans = Math.min(takeHalfPrice, noHalfPrice);
    memo.set(key, ans);
    return ans;
  }
  
  function makeTrip(start, end) { // bfs to find the path from start to end
    let queue = [[start, [start]]], seen = Array(n).fill(0);
    seen[start] = 1;
    while (queue.length) {
      let [node, path] = queue.shift();
      if (node === end) return path;
      for (let nei of graph[node]) {
        if (seen[nei]) continue;
        seen[nei] = 1;
        queue.push([nei, [...path, nei]]);
      }
    }
  }
};

// Two test cases
console.log(minimumTotalPrice(4, [[0,1],[1,2],[1,3]], [2,2,10,6], [[0,3],[2,1],[2,3]])) // 23
console.log(minimumTotalPrice(2, [[0,1]], [2,2], [[0,0]])) // 1