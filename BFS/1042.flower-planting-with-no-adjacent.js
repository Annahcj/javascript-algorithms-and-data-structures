// 1042. Flower Planting With No Adjacent
// You have n gardens, labeled from 1 to n, and an array paths where paths[i] = [xi, yi] describes a bidirectional path between garden xi to garden yi. In each garden, you want to plant one of 4 types of flowers.
// All gardens have at most 3 paths coming into or leaving it.
// Your task is to choose a flower type for each garden such that, for any two gardens connected by a path, they have different types of flowers.
// Return any such a choice as an array answer, where answer[i] is the type of flower planted in the (i+1)th garden. The flower types are denoted 1, 2, 3, or 4. It is guaranteed an answer exists.


// Solution: BFS

// Since we have at most 3 edges for each node, there is always at least one color available.
// BFS from each unvisited node.
// Keep track of nodes we have seen before to avoid revisiting.
// For each node, check the colors of each neighbor and pick an unused color.

// n = number of nodes, m = number of edges
// Time Complexity: O(n + m) 264ms
// Space Complexity: O(n + m) 59.3MB
var gardenNoAdj = function(n, paths) {
  let graph = Array(n).fill(0).map(() => []);
  for (let [x, y] of paths) {
    graph[x - 1].push(y - 1);
    graph[y - 1].push(x - 1);
  }
  
  let seen = Array(n).fill(0), color = Array(n).fill(0), queue = [];
  for (let i = 0; i < n; i++) {
    if (!seen[i]) {
      queue = [i];
      seen[i] = 1;
      while (queue.length) {
        let node = queue.shift();
        let colorUsed = Array(5).fill(0);
        for (let nei of graph[node]) {
          if (seen[nei]) {
            if (color[nei]) colorUsed[color[nei]] = 1;
            continue;
          }
          queue.push(nei);
          seen[nei] = 1;
        }
        for (let nodeColor = 1; nodeColor <= 4; nodeColor++) {
          if (!colorUsed[nodeColor]) {
            color[node] = nodeColor;
          }
        }
      }
    }
  }
  return color;
};

// Three test cases (Note: there may be more than one possible answer)
console.log(gardenNoAdj(3, [[1,2],[2,3],[3,1]])) // [4,3,2]
console.log(gardenNoAdj(4, [[1,2],[3,4]])) // [4,3,4,3]
console.log(gardenNoAdj(4, [[1,2],[2,3],[3,4],[4,1],[1,3],[2,4]])) // [4,3,1,2]