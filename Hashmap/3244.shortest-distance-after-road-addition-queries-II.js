// 3244. Shortest Distance After Road Addition Queries II
// You are given an integer n and a 2D integer array queries.
// There are n cities numbered from 0 to n - 1. Initially, there is a unidirectional road from city i to city i + 1 for all 0 <= i < n - 1.
// queries[i] = [u[i], v[i]] represents the addition of a new unidirectional road from city u[i] to city v[i]. After each query, you need to find the length of the shortest path from city 0 to city n - 1.
// There are no two queries such that queries[i][0] < queries[j][0] < queries[i][1] < queries[j][1].
// Return an array answer where for each i in the range [0, queries.length - 1], answer[i] is the length of the shortest path from city 0 to city n - 1 after processing the first i + 1 queries.


// Solution: Hashmap

// queries[i][0] < queries[j][0] < queries[i][1] < queries[j][1] means that there are no two overlapping queries.
// However, there can be queries that start or end at the same node, so those queries need to be accounted for using a map.
// Map each node to the next node.
// We remove all nodes in between [u, v] from the map if they still exist, following the next nodes from the map.

// Scenarios to account for:
  // 1. Queries start at the same node and end at different nodes.
    // a. Previous query ends at a later node than the current query: (1 -> 2) is current, (1 -> 4) is previous.
      // Don't need to remove any nodes since previous query covers the whole range of the current query.
    // b. Previous query ends earlier than the current query: (1 -> 4) is current, (1 -> 2) is previous.
      // Remove all nodes in between the current query. Previous query will be overridden.
  // 2. Queries start at different nodes and end at the same node.
    // a. Previous query starts earlier than the current query: (3 -> 5) is current, (1 -> 5) is previous.
      // Don't need to remove any nodes since previous query covers the whole range of the current query.
    // b. Previous query starts later than the current query: (1 -> 5) is current, (3 -> 5) is previous.  
      // Remove all nodes in between the current query. Previous query will be overridden.

// n = number of nodes, m = number of queries
// Time Complexity: O(n + m) 355ms
// Space Complexity: O(n + m) 83.7MB
function shortestDistanceAfterQueries(n, queries) {
  let next = new Map();
  for (let i = 0; i < n - 1; i++) {
    next.set(i, i + 1);
  }
  let ans = [];
  for (let [u, v] of queries) {
    if (!next.has(u)) { // this means a query started at a different node but ends at the same node
      ans.push(next.size);
      continue;
    }
    let node = next.get(u);
    while (node < v) {
      let removed = next.get(node);
      next.delete(node);
      node = removed;
    }
    if (next.get(u) < v) {
      next.set(u, v);
    }
    ans.push(next.size);
  }
  return ans;
};

// Two test cases
console.log(shortestDistanceAfterQueries(5, [[2,4],[0,2],[0,4]])) // [3,2,1]
console.log(shortestDistanceAfterQueries(4, [[0,3],[0,2]])) // [1,1]