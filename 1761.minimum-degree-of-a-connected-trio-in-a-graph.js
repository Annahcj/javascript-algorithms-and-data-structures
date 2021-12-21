// 1761. Minimum Degree of a Connected Trio in a Graph
// You are given an undirected graph. You are given an integer n which is the number of nodes in the graph and an array edges, where each edges[i] = [ui, vi] indicates that there is an undirected edge between ui and vi.
// A connected trio is a set of three nodes where there is an edge between every pair of them.
// The degree of a connected trio is the number of edges where one endpoint is in the trio, and the other is not.
// Return the minimum degree of a connected trio in the graph, or -1 if the graph has no connected trios.


// Solution: Adjacency List

// Keep edges in a hashmap for each vertex 
// edges: [[1,2],[1,3],[3,2],[4,1],[5,2],[3,6]]
// graph = {
//   1: {2: true, 3: true, 4: true, degrees: 3},
//   2: {1: true, 3: true, 5: true, degrees: 3},
//   3: {1: true, 3: true, 5: true, degrees: 3},
//   4: {1: true, degrees: 1},
//   5: {2: true, degrees: 1},
//   6: {3: true, degrees: 1}
// }

// 1. Create adjacency list
// 2. Loop through all combinations of trios where i < j < k (to optimize time)

// Time Complexity: O(n^3) 192ms
// Space Complexity: O(V + E) 53.6MB
var minTrioDegree = function(n, edges) {
  let graph = {};
  for (var i = 1; i <= n; i++) graph[i] = {degrees: 0};
  for (var [x, y] of edges) {
    graph[x][y] = true;
    graph[y][x] = true;
    graph[x].degrees++;
    graph[y].degrees++;
  }  
  let minDeg = Infinity;
  for (i = 1; i <= n; i++) {
    for (var j = i + 1; j <= n; j++) {
      if (graph[i][j]) { // only if i is connected to j
        for (var k = j + 1; k <= n; k++) {
          if (graph[i][k] && graph[j][k]) { // if i is connected to k and j is connected with k.
            minDeg = Math.min(minDeg, graph[i].degrees + graph[j].degrees + graph[k].degrees - 6); // all their degrees - 6 (two degrees for each connection in trio * 3)
          }
        }
      }
    }
  }
  return minDeg === -Infinity ? -1 : minDeg;
};

// Two test cases to run function on
console.log(minTrioDegree(6, [[1,2],[1,3],[3,2],[4,1],[5,2],[3,6]])) // 3
console.log(minTrioDegree(7, [[1,3],[4,1],[4,3],[2,5],[5,6],[6,7],[7,5],[2,6]])) // 0