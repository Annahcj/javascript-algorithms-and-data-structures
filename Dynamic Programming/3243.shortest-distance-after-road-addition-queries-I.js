// 3243. Shortest Distance After Road Addition Queries I
// You are given an integer n and a 2D integer array queries.
// There are n cities numbered from 0 to n - 1. Initially, there is a unidirectional road from city i to city i + 1 for all 0 <= i < n - 1.
// queries[i] = [u[i], v[i]] represents the addition of a new unidirectional road from city u[i] to city v[i]. After each query, you need to find the length of the shortest path from city 0 to city n - 1.
// Return an array answer where for each i in the range [0, queries.length - 1], answer[i] is the length of the shortest path from city 0 to city n - 1 after processing the first i + 1 queries.


// Solution: DP

// Populate dist, where dist[i] = shortest distance from 0 to i
// For every query [l, r], update all distances in the range [r, n-1].
// Maintain a reverse graph (in the opposite direction of edges) to update the distances.

// m = number of queries
// Time Complexity: O(m^2 * n) 148ms
// Space Complexity: O(n + m) 58MB
var shortestDistanceAfterQueries = function(n, queries) {
  let revGraph = Array(n).fill(0).map(() => []);
  let dist = Array(n);
  for (let i = 0; i < n; i++) {
    dist[i] = i;
    if (i > 0) {
      revGraph[i].push(i - 1);
    }
  }
  let ans = [];
  for (let [l, r] of queries) {
    revGraph[r].push(l);
    for (let j = r; j < n; j++) {
      for (let prevNei of revGraph[j]) {
        dist[j] = Math.min(dist[j], 1 + dist[prevNei]);
      }
    }
    ans.push(dist[n - 1]);
  }
  return ans;
};

// Two test cases
console.log(shortestDistanceAfterQueries(5, [[2,4],[0,2],[0,4]])) // [3,2,1]
console.log(shortestDistanceAfterQueries(4, [[0,3],[0,2]])) // [1,1]