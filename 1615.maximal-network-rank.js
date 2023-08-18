// 1615. Maximal Network Rank
// There is an infrastructure of n cities with some number of roads connecting these cities. Each roads[i] = [ai, bi] indicates that there is a bidirectional road between cities ai and bi.
// The network rank of two different cities is defined as the total number of directly connected roads to either city. If a road is directly connected to both cities, it is only counted once.
// The maximal network rank of the infrastructure is the maximum network rank of all pairs of different cities.
// Given the integer n and the array roads, return the maximal network rank of the entire infrastructure.


// Solution: Brute Force w/ Sets

// For each node, keep track of direct neighbors in a hashset.
// Go through each pair of nodes and count the number of roads.
  // If the two nodes are directly connected to each other, subtract 1 from the total count of roads.

// n = number of nodes, m = number of roads
// Time Complexity: O(n^2 + m) 94ms
// Space Complexity: O(n + m) 49.9MB
var maximalNetworkRank = function(n, roads) {
  let directNeighbors = Array(n).fill(0).map(() => new Set());
  for (let [a, b] of roads) {
    directNeighbors[a].add(b);
    directNeighbors[b].add(a);
  }
  let maxRank = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let areDirectNeighbors = directNeighbors[i].has(j);
      maxRank = Math.max(maxRank, directNeighbors[i].size + directNeighbors[j].size - (areDirectNeighbors ? 1 : 0));
    }
  }
  return maxRank;
};

// Three test cases
console.log(maximalNetworkRank(4, [[0,1],[0,3],[1,2],[1,3]])) // 4
console.log(maximalNetworkRank(5, [[0,1],[0,3],[1,2],[1,3],[2,3],[2,4]])) // 5
console.log(maximalNetworkRank(8, [[0,1],[1,2],[2,3],[2,4],[5,6],[5,7]])) // 5