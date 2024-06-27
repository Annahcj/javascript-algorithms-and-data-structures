// 1791. Find Center of Star Graph
// There is an undirected star graph consisting of n nodes labeled from 1 to n. A star graph is a graph where there is one center node and exactly n - 1 edges that connect the center node with every other node.
// You are given a 2D integer array edges where each edges[i] = [u[i], v[i]] indicates that there is an edge between the nodes ui and vi. Return the center of the given star graph.


// Solution: Find Common Node

// Find the node that exists in both the first and second edge.
// Since the graph is guaranteed to be a valid star graph, all the rest of the edges will also have the center node.

// Time Complexity: O(1) 75ms
// Space Complexity: O(1) 64.6MB
function findCenter(edges) {
  return edges[0][0] === edges[1][0] || edges[0][0] === edges[1][1] ? edges[0][0] : edges[0][1];
};

// Two test cases
console.log(findCenter([[1,2],[2,3],[4,2]])) // 2
console.log(findCenter([[1,2],[5,1],[1,3],[1,4]])) // 1