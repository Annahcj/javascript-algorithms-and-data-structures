// 1334. Find the City With the Smallest Number of Neighbors at a Threshold Distance
// There are n cities numbered from 0 to n-1. Given the array edges where edges[i] = [fromi, toi, weighti] represents a bidirectional and weighted edge between cities fromi and toi, and given the integer distanceThreshold.
// Return the city with the smallest number of cities that are reachable through some path and whose distance is at most distanceThreshold, If there are multiple such cities, return the city with the greatest number.
// Notice that the distance of a path connecting cities i and j is equal to the sum of the edges' weights along that path.


// Solution: Floyd Warshall

// 1. Use the Floyd Warshall algorithm to find the shortest distance from each pair of nodes.
  // Populate dist with the edges we have. Each dist[i][j] = the current shortest distance from node i to node j.
  // Use up the edges involving each node k (i -> k -> j)

// 2. For each node i, count the number of cities j where dist[i][j] <= distanceThreshold.
  // Record the city with the smallest number of reachable cities.

// Time Complexity: O(n^3) 185ms
// Space Complexity: O(n^2) 50.2MB
var findTheCity = function(n, edges, distanceThreshold) {
  let dist = Array(n).fill(0).map(() => Array(n).fill(Infinity));  
  for (let i = 0; i < n; i++) {
    dist[i][i] = 0;
  }
  for (let [x, y, weight] of edges) {
    dist[x][y] = weight;
    dist[y][x] = weight;
  }
    
  // floyd warshall - find shortest distance from each pair of nodes
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        // connect i -> k with k -> j
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }
  
  let ans = 0, minNeighbors = Infinity;
  for (let i = 0; i < n; i++) {
    let neighbors = dist[i].reduce((sum, dist) => {
      if (dist <= distanceThreshold) sum++;
      return sum;
    }, 0);
    
    if (neighbors <= minNeighbors) {
      ans = i;
      minNeighbors = neighbors;
    }
  }
  return ans;
};

// Two test cases 
console.log(findTheCity(4, [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], 4)) // 3
console.log(findTheCity(5,[[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]], 2)) // 0