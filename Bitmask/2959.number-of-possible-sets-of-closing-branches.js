// 2959. Number of Possible Sets of Closing Branches
// There is a company with n branches across the country, some of which are connected by roads. Initially, all branches are reachable from each other by traveling some roads.
// The company has realized that they are spending an excessive amount of time traveling between their branches. As a result, they have decided to close down some of these branches (possibly none). However, they want to ensure that the remaining branches have a distance of at most maxDistance from each other.
// The distance between two branches is the minimum total traveled length needed to reach one branch from another.
// You are given integers n, maxDistance, and a 0-indexed 2D array roads, where roads[i] = [u[i], v[i], w[i]] represents the undirected road between branches u[i] and v[i] with length w[i].
// Return the number of possible sets of closing branches, so that any branch has a distance of at most maxDistance from any other.
// Note that, after closing a branch, the company will no longer have access to any roads connected to it.
// Note that, multiple roads are allowed.


// Solution: Enumeration w/ Bitmasks & Floyd Warshall

// Because n <= 10, we can use enumeration using bitmasks to go through each possible set of nodes to keep.

// For each bitmask, find the minimum distance for each pair of remaining nodes, and check if the maximum distance <= maxDistance. 
// Use Floyd Warshall algorithm to find the minimum distance between each pair of nodes in O(n^3) time complexity.

// n = number of branches, m = number of roads
// Time Complexity: O(2^n * n^3 + m) 315ms
// Space Complexity: O(n^2) 51.8MB
var numberOfSets = function(n, maxDistance, roads) {
  let graph = Array(n).fill(0).map(() => Array(n).fill(Infinity));
  for (let i = 0; i < n; i++) {
    graph[i][i] = 0; // node is always reachable from itself
  }
  for (let [u, v, w] of roads) {
    graph[u][v] = Math.min(graph[u][v], w);
    graph[v][u] = Math.min(graph[v][u], w);
  }
  
  let count = 1; // empty set
  for (let mask = 1; mask < (1 << n); mask++) {
    let nodes = getNodesFromBitmask(mask, n);
    let minDist = graph.map((row) => [...row]);
    for (let k = 0; k < n; k++) {
      if (!nodes.has(k)) continue; 
      for (let i = 0; i < n; i++) {
        if (!nodes.has(i)) continue;
        for (let j = 0; j < n; j++) {
          if (!nodes.has(j)) continue; 
          minDist[i][j] = Math.min(minDist[i][j], minDist[i][k] + minDist[k][j]);
        }
      }
    }
    let maxDist = 0;
    for (let node of nodes) {
      for (let node2 of nodes) {
        maxDist = Math.max(maxDist, minDist[node][node2]);
      }
    }
    count += maxDist <= maxDistance ? 1 : 0;
  }
  return count;
};

function getNodesFromBitmask(mask, n) {
  let nodes = new Set();
  for (let i = 0; i < n; i++) {
    if ((mask >> i) & 1) {
      nodes.add(i);
    }
  }
  return nodes;
}

// Three test cases
console.log(numberOfSets(3, 5, [[0,1,2],[1,2,10],[0,2,10]])) // 5
console.log(numberOfSets(3, 5, [[0,1,20],[0,1,10],[1,2,2],[0,2,2]])) // 7
console.log(numberOfSets(1, 10, [])) // 2