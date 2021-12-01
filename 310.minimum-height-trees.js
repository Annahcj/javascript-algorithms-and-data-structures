// 310. Minimum Height Trees
// A tree is an undirected graph in which any two vertices are connected by exactly one path. In other words, any connected graph without simple cycles is a tree.
// Given a tree of n nodes labelled from 0 to n - 1, and an array of n - 1 edges where edges[i] = [ai, bi] indicates that there is an undirected edge between the two nodes ai and bi in the tree, you can choose any node of the tree as the root. When you select a node x as the root, the result tree has height h. Among all possible rooted trees, those with minimum height (i.e. min(h))  are called minimum height trees (MHTs).
// Return a list of all MHTs' root labels. You can return the answer in any order.


// Solution: Topological Sort

// Process each level of leaf nodes ->
  // find the first batch of leaf nodes (nodes with only one edge)
  // process the leaf nodes: decrement the indegree of the nodes they are connected to and get the next batch of leaf nodes until we are left with a group of one of two leaf nodes. 
  // The final group is our answer.

// Time Complexity: O(n) 100ms
// Space Complexity: O(n) 46.6MB
var findMinHeightTrees = function(n, edges) {
  let graph = {}, indegrees = Array(n);
  if (n === 1) return [0];
  for (var i = 0; i < n; i++) graph[i] = [];
  for (var [x, y] of edges) { // construct graph
    graph[x].push(y);
    graph[y].push(x);
  } 
  let queue = [];
  for (i = 0; i < n; i++) { // get leaf nodes
    indegrees[i] = graph[i].length;
    if (indegrees[i] === 1) queue.push(i);
  }
  while (n > 2) { // until there are only two nodes remaining
    n -= queue.length; 
    let next = []; // process level by level
    let size = queue.length;
    for (i = 0; i < size; i++) {
      let node = queue[i];
      for (var neighbor of graph[node]) {
        indegrees[neighbor]--;
        if (indegrees[neighbor] === 1) next.push(neighbor);
      }
    }
    queue = next;
  }
  return queue;
};

// Five test cases to run function on
console.log(findMinHeightTrees(4, [[1,0],[1,2],[1,3]])) // [1]
console.log(findMinHeightTrees(6, [[3,0],[3,1],[3,2],[3,4],[5,4]])) // [3,4]
console.log(findMinHeightTrees(1, [])) // [0]
console.log(findMinHeightTrees(2, [[0,1]])) // [0,1]
console.log(findMinHeightTrees(3, [[0,1],[0,2]])) // [0]