// 2077. Paths in Maze That Lead to Same Room
// A maze consists of n rooms numbered from 1 to n, and some rooms are connected by corridors. You are given a 2D integer array corridors where corridors[i] = [room1i, room2i] indicates that there is a corridor connecting room1i and room2i, allowing a person in the maze to go from room1i to room2i and vice versa.
// The designer of the maze wants to know how confusing the maze is. The confusion score of the maze is the number of different cycles of length 3.
  // For example, 1 → 2 → 3 → 1 is a cycle of length 3, but 1 → 2 → 3 → 4 and 1 → 2 → 3 → 2 → 1 are not.
// Two cycles are considered to be different if one or more of the rooms visited in the first cycle is not in the second cycle.
// Return the confusion score of the maze.


// Solution 1: Brute Force

// Loop over every three nodes (i, j, k) and check whether they're all connected to each other.
// Optimization: Make sure i < j < k, this is also useful for avoiding counting duplicates.

// Time Complexity: O(V^3) 1324ms
// Space Complexity: O(E) 63.7MB
var numberOfPaths = function(n, corridors) {
  let graph = {};
  for (let i = 1; i <= n; i++) graph[i] = new Set();
  for (let [x, y] of corridors) {
    graph[x].add(y);
    graph[y].add(x);
  }
  let score = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = i + 1; j <= n; j++) {
      if (!graph[i].has(j)) continue;
      for (let k = j + 1; k <= n; k++) {
        if (graph[j].has(k) && graph[k].has(i)) score++;
      }
    }
  }  
  return score;
};


// Solution 2: Time Optimized

// For each (i, j) in corridors, 
  // loop through each neighbor (k) of i that is also a neighbor of j.
  // to avoid counting duplicates, make sure k is smaller than both i and j.

// E = number of edges, V = number of vertices
// Time Complexity: O(EV) 559ms
// Space Complexity: O(E) 64MB
var numberOfPaths = function(n, corridors) {
  let graph = {};
  for (let i = 1; i <= n; i++) graph[i] = new Set();
  for (let [x, y] of corridors) {
    graph[x].add(y);
    graph[y].add(x);
  }
  let count = 0;
  for (let [i, j] of corridors) {
    for (let k of graph[i]) {
      if (k === j || k < i || k < j) continue;
      if (graph[j].has(k)) {
        count++;
      }
    }
  }
  return count;
};

// Two test cases
console.log(numberOfPaths(5, [[1,2],[5,2],[4,1],[2,4],[3,1],[3,4]])) // 2
console.log(numberOfPaths(4, [[1,2],[3,4]])) // 0