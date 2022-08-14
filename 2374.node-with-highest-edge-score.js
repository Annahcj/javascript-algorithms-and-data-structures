// 2374. Node With Highest Edge Score
// You are given a directed graph with n nodes labeled from 0 to n - 1, where each node has exactly one outgoing edge.
// The graph is represented by a given 0-indexed integer array edges of length n, where edges[i] indicates that there is a directed edge from node i to node edges[i].
// The edge score of a node i is defined as the sum of the labels of all the nodes that have an edge pointing to i.
// Return the node with the highest edge score. If multiple nodes have the same edge score, return the node with the smallest index.


// Solution: Counting

// Populate score[i], where i is the sum of node values that have an edge to node i.
// Get the node with the highest score.

// Time Complexity: O(n) 135ms
// Space Complexity: O(n) 56.4MB
var edgeScore = function(edges) {
  let n = edges.length, score = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    score[edges[i]] += i;
  }
  let ans = 0;
  for (let i = 1; i < n; i++) {
    if (score[i] > score[ans]) {
      ans = i;
    }
  }
  return ans;
};

// Two test cases to run function on
console.log(edgeScore([1,0,0,0,0,7,7,5])) // 7
console.log(edgeScore([2,0,0,2])) // 0