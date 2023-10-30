// 1617. Count Subtrees With Max Distance Between Cities
// There are n cities numbered from 1 to n. You are given an array edges of size n-1, where edges[i] = [ui, vi] represents a bidirectional edge between cities ui and vi. There exists a unique path between each pair of cities. In other words, the cities form a tree.
// A subtree is a subset of cities where every city is reachable from every other city in the subset, where the path between each pair passes through only the cities from the subset. Two subtrees are different if there is a city in one subtree that is not present in the other.
// For each d from 1 to n-1, find the number of subtrees in which the maximum distance between any two cities in the subtree is equal to d.
// Return an array of size n-1 where the dth element (1-indexed) is the number of subtrees in which the maximum distance between any two cities is equal to d.
// Notice that the distance between the two cities is the number of edges in the path between them.

 
// Solution: Bitmask & Floyd Warshall

// 1. Use the floyd warshall algorithm to get the shortest distance between each pair of ndoes.
// 2. Enumerate from 1 to 2^n to get every subset.
  // Check whether subset is valid (number of edges (dist[i][j] === 1) === number of nodes - 1)
    // this check works because there is only one unique path between each pair of nodes.
    // if the subtree is valid, there must be exactly n - 1 edges.
  // Go through each pair of nodes to get the maximum distance.

// Time Complexity: O(2^n * n^2) 312ms
// Space Complexity: O(n^2) 46.5MB
var countSubgraphsForEachDiameter = function(n, edges) {
  let dist = Array(n).fill(0).map(() => Array(n).fill(Infinity));
  for (let [x, y] of edges) {
    dist[x - 1][y - 1] = 1;
    dist[y - 1][x - 1] = 1;
  }

  for (let k = 0; k < n; k++) {
    // using k as middle node
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }
  
  let res = Array(n - 1).fill(0);
  for (let mask = 1; mask < (1 << n); mask++) { // generate every possible subset
    let maxDist = getMaxDistance(mask);
    if (maxDist > 0) res[maxDist - 1]++;
  }
  return res;
  
  function getMaxDistance(subtree) {
    let nodes = 0, numEdges = 0, maxDist = 0;
    for (let i = 0; i < n; i++) {
      if (!(1 & (subtree >> i))) continue; // node not in subtree
      nodes++;
      for (let j = i + 1; j < n; j++) {
        if (!(1 & (subtree >> j))) continue; // node not in subtree
        if (dist[i][j] === 1) numEdges++;
        maxDist = Math.max(maxDist, dist[i][j]);
      }
    }
    return numEdges === nodes - 1 ? maxDist : 0;
  }
};

// Two test cases
console.log(countSubgraphsForEachDiameter(4, [[1,2],[2,3],[2,4]])) // [3,4,0] 
console.log(countSubgraphsForEachDiameter(2, [[1,2]])) // [1] 