// 797. All Paths From Source to Target


// Solution: Recursive DFS

// Let paths be the array which contains all the paths
// Call dfs(0, [])
// Return paths
// dfs: (node, path)
  // Push node into path
  // Check if we have reached the target node
    // Push deep copy of path into paths
    // Return
  // Loop through each neighbor in graph[node]
    // call dfs(neighbor, path)
    // pop the last node from path

// Time Complexity: O(2^n * n) 131ms
// Space Complexity: O(2^n * n) 45.2MB
var allPathsSourceTarget = function(graph) {
  let n = graph.length;
  let paths = [];
  dfs(0, []);
  function dfs(node, path) {
    path.push(node);
    if (node === n - 1) {
      paths.push([...path]);
      return;
    }
    for (var neighbor of graph[node]) {
      dfs(neighbor, path);
      path.pop();
    }
  }
  return paths;
};

// Two test cases to run function on
console.log(allPathsSourceTarget([[1,2],[3],[3],[]])) // [[0,1,3],[0,2,3]]
console.log(allPathsSourceTarget([[4,3,1],[3,2,4],[3],[4],[]])) // [[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]