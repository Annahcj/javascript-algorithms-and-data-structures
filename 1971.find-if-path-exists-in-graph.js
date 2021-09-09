// 1971. Find if Path Exists in Graph
// There is a bi-directional graph with n vertices, where each vertex is labeled from 0 to n - 1 (inclusive). The edges in the graph are represented as a 2D integer array edges, where each edges[i] = [ui, vi] denotes a bi-directional edge between vertex ui and vertex vi. Every vertex pair is connected by at most one edge, and no vertex has an edge to itself.
// You want to determine if there is a valid path that exists from vertex start to vertex end.
// Given edges and the integers n, start, and end, return true if there is a valid path from start to end, or false otherwise.


// Solution 1: DFS Iterative

// Create adjacency list for the edges (bi-directional, so add them both ways)
// Initiate a stack with start, initiate a visited hashmap to keep track of vertices we have been to
// Loop while stack is not empty *
  // Pop from stack, store it in variable curr
  // if curr is equal to end, return true (valid path found)
  // Otherwise, loop through each neighbor in adjacencyList[curr]
    // If neighbor is not visited yet,
      // mark neighbor as visited
      // push neighbor into stack
// *
// If the loop has finished, return false (no path was found)

// Time Complexity: O(V + E) 705ms
// Space Complexity: O(V) 144.5MB
var validPath = function(n, edges, start, end) {
  let adjacencyList = {};
  for (var [a, b] of edges) {
    if (!adjacencyList[a]) adjacencyList[a] = [];
    if (!adjacencyList[b]) adjacencyList[b] = [];
    adjacencyList[a].push(b);
    adjacencyList[b].push(a);
  }
  let stack = [start];
  let visited = {};
  visited[start] = true;
  while (stack.length) {
    let curr = stack.pop();
    if (curr === end) return true;
    for (var neighbor of adjacencyList[curr]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        stack.push(neighbor);
      }
    }
  }
  return false;
};


// Solution 2: BFS

// Create adjacency list for the edges (bi-directional, so add them both ways)
// Initiate a queue with start, initiate a visited hashmap to keep track of vertices we have been to
// Loop while queue is not empty *
  // Shift from queue, store it in variable curr
  // if curr is equal to end, return true (valid path found)
  // Otherwise, loop through each neighbor in adjacencyList[curr]
    // If neighbor is not visited yet,
      // mark neighbor as visited
      // push neighbor into queue
// *
// If the loop has finished, return false (no path was found)

// Time Complexity: O(V + E) 572ms
// Space Complexity: O(V) 104MB
var validPath = function(n, edges, start, end) {
  let adjacencyList = {};
  for (var [a, b] of edges) {
    if (!adjacencyList[a]) adjacencyList[a] = [];
    if (!adjacencyList[b]) adjacencyList[b] = [];
    adjacencyList[a].push(b);
    adjacencyList[b].push(a);
  }
  let queue = [start];
  let visited = {};
  visited[start] = true;
  while (queue.length) {
    let curr = queue.shift();
    if (curr === end) return true;
    for (var neighbor of adjacencyList[curr]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
      }
    }
  }
  return false;
};

// Two test cases to run function on
console.log(validPath(3, [[0,1],[1,2],[2,0]], 0, 2)) // true
console.log(validPath(6, [[0,1],[0,2],[3,5],[5,4],[4,3]], 0, 5)) // false