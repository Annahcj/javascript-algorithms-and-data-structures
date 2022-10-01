// 1466. Reorder Routes to Make All Paths Lead to the City Zero
// There are n cities numbered from 0 to n - 1 and n - 1 roads such that there is only one way to travel between two different cities (this network form a tree). Last year, The ministry of transport decided to orient the roads in one direction because they are too narrow.
// Roads are represented by connections where connections[i] = [ai, bi] represents a road from city ai to city bi.
// This year, there will be a big event in the capital (city 0), and many people want to travel to this city.
// Your task consists of reorienting some roads such that each city can visit the city 0. Return the minimum number of edges changed.
// It's guaranteed that each city can reach city 0 after reorder.


// Solution: DFS

// Since there are only n - 1 edges, for every node to reach city 0, every edge must lead to city 0.
// Store each edge and reverse edge in a graph (mark reverse edges with a negative weight).
// Recursively DFS starting from node 0.
  // If we find an edge with positive weight leading away from city 0, we need to reverse it. Count the number of these edges.

// n = number of nodes, m = number of edges
// Time Complexity: O(n + m) 656ms
// Space Complexity: O(m) 119.8MB
var minReorder = function(n, connections) {
  let graph = Array(n).fill(0).map(() => []);
  for (let [a, b] of connections) {
    graph[a].push([b, 1]);
    graph[b].push([a, -1]); // reverse edge
  }
  
  let seen = Array(n).fill(0), ans = 0;
  dfs(0);
  return ans;
  
  function dfs(node) {
    seen[node] = 1;
    for (let [nei, weight] of graph[node]) {
      if (seen[nei]) continue;
      if (weight > 0) ans++;
      dfs(nei);
    }
  }
};

// Three test cases
console.log(minReorder(6, [[0,1],[1,3],[2,3],[4,0],[4,5]])) // 3
console.log(minReorder(5, [[1,0],[1,2],[3,2],[3,4]])) // 2
console.log(minReorder(3, [[1,0],[2,0]])) // 0