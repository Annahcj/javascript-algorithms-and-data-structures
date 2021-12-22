// 1615. Maximal Network Rank
// There is an infrastructure of n cities with some number of roads connecting these cities. Each roads[i] = [ai, bi] indicates that there is a bidirectional road between cities ai and bi.
// The network rank of two different cities is defined as the total number of directly connected roads to either city. If a road is directly connected to both cities, it is only counted once.
// The maximal network rank of the infrastructure is the maximum network rank of all pairs of different cities.
// Given the integer n and the array roads, return the maximal network rank of the entire infrastructure.


// Solution: Adjacency List

// 1. Convert roads to a graph which keeps the roads for each city in a hashmap (additionally count the number of roads for each city)
// 2. Loop through each pair for cities where i < j, find the maximal network rank. 
  // Note: If the two cities are connected, subtract one from their total rank.

// Time Complexity: O(n^2) 92ms
// Space Complexity: O(V + E) 46.3MB
var maximalNetworkRank = function(n, roads) {
  let graph = {};
  for (var i = 0; i < n; i++) {
    graph[i] = {degrees: 0};
  }  
  for (var [x, y] of roads) {
    graph[x][y] = true;
    graph[y][x] = true;
    graph[x].degrees++;
    graph[y].degrees++;
  }
  let maxRank = 0;
  for (i = 0; i < n; i++) {
    for (var j = i + 1; j < n; j++) {
      let rank = graph[i].degrees + graph[j].degrees;
      if (graph[i][j]) rank--;
      maxRank = Math.max(maxRank, rank);
    }
  }
  return maxRank;
};

// Three test cases to run function on
console.log(maximalNetworkRank(4, [[0,1],[0,3],[1,2],[1,3]])) // 4
console.log(maximalNetworkRank(5, [[0,1],[0,3],[1,2],[1,3],[2,3],[2,4]])) // 5
console.log(maximalNetworkRank(8, [[0,1],[1,2],[2,3],[2,4],[5,6],[5,7]])) // 5