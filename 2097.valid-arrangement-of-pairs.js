// 2097. Valid Arrangement of Pairs
// You are given a 0-indexed 2D integer array pairs where pairs[i] = [starti, endi]. An arrangement of pairs is valid if for every index i where 1 <= i < pairs.length, we have endi-1 == starti.
// Return any valid arrangement of pairs.
// Note: The inputs will be generated such that there exists a valid arrangement of pairs.


// Solution: Hierholzer's Algorithm

// Hierholzer's Algorithm for finding an Eulerian Path in a directed graph.

// two situations: 
//   1. in each node, the indegree equals the outdegree. (we can start at any node)
//   2. in one node, the indegree is one larger than the outdegree, in another node,
//       the outdegree is one larger than the indegree, and in all other nodes, the indegree equals the outdegree. 
//       (start node: node with one more outdegree than indegree)
//       (end node: node with one more indegree than outdegree)

// Do a postorder dfs from the start node.
// We must use postorder because some nodes will have a dead-end (no more outgoing edges), which means we have to visit it last.

// Time Complexity: O(n) 1304ms
// Space Complexity: O(n) 111.6MB
var validArrangement = function(pairs) {
  let graph = {};
  let degrees = {}; // outdegree: positive, indegree: negative
  for (var [x, y] of pairs) {
    if (!graph[x]) graph[x] = [];
    graph[x].push(y);
    if (degrees[x] === undefined) degrees[x] = 0;
    if (degrees[y] === undefined) degrees[y] = 0;
    degrees[x]++;
    degrees[y]--;
  }
  let start = pairs[0][0];
  for (var [x] of pairs) {
    if (degrees[x] === 1) start = x;
  }
  let ans = [];
  dfs(start);

  function dfs(node) {
    while ((graph[node] || []).length) {
      let neighbor = graph[node].pop();
      dfs(neighbor);
      ans.push([node, neighbor]); 
    }
  }
  return ans.reverse();
};

// Three test cases to run function on
console.log(validArrangement([[5,1],[4,5],[11,9],[9,4]])) // [[11,9],[9,4],[4,5],[5,1]]
console.log(validArrangement([[1,3],[3,2],[2,1]])) // [[1,3],[3,2],[2,1]]
console.log(validArrangement([[1,2],[1,3],[2,1]])) // [[1,2],[2,1],[1,3]]