// 2924. Find Champion II
// There are n teams numbered from 0 to n - 1 in a tournament; each team is also a node in a DAG.
// You are given the integer n and a 0-indexed 2D integer array edges of length m representing the DAG, where edges[i] = [u[i], v[i]] indicates that there is a directed edge from team u[i] to team v[i] in the graph.
// A directed edge from a to b in the graph means that team a is stronger than team b and team b is weaker than team a.
// Team a will be the champion of the tournament if there is no team b that is stronger than team a.
// Return the team that will be the champion of the tournament if there is a unique champion, otherwise, return -1.
// Notes
  // A cycle is a series of nodes a1, a2, ..., an, an+1 such that node a1 is the same node as node an+1, the nodes a1, a2, ..., an are distinct, and there is a directed edge from the node ai to node ai+1 for every i in the range [1, n].
  // A DAG is a directed graph that does not have any cycle.


// Solution: Count Nodes with Zero Indegree

// Count the indegrees of each node.
// There should be exactly one node with an indegree of zero.

// n = number of nodes, m = number of edges
// Time Complexity: O(n + m) 106ms
// Space Complexity: O(n) 50.1MB
var findChampion = function(n, edges) {
  let indegrees = Array(n).fill(0);
  for (let [_a, b] of edges) {
    indegrees[b]++;
  }
  let championCount = 0, champion = -1;
  for (let i = 0; i < n; i++) {
    if (indegrees[i] === 0) {
      championCount++;
      champion = i;
    }
  }
  return championCount === 1 ? champion : -1;
};

// Two test cases
console.log(findChampion(3, [[0,1],[1,2]])) // 0
console.log(findChampion(4, [[0,2],[1,3],[1,2]])) // -1