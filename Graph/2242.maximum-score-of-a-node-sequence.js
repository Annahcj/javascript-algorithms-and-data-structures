// 2242. Maximum Score of a Node Sequence
// There is an undirected graph with n nodes, numbered from 0 to n - 1.
// You are given a 0-indexed integer array scores of length n where scores[i] denotes the score of node i. You are also given a 2D integer array edges where edges[i] = [ai, bi] denotes that there exists an undirected edge connecting nodes ai and bi.
// A node sequence is valid if it meets the following conditions:
  // There is an edge connecting every pair of adjacent nodes in the sequence.
  // No node appears more than once in the sequence.
// The score of a node sequence is defined as the sum of the scores of the nodes in the sequence.
// Return the maximum score of a valid node sequence with a length of 4. If no such sequence exists, return -1.

 
// Solution: Store Three Maximum Neighbors

// For every node, store the maximum three neighbor nodes.
// Go through each edge (takes care of two nodes),
  // Find the maximum neighbor of the first node and the maximum neighbor of the second node.
    // They must not be the original two nodes.
    // They can be shared neighbors between the original two nodes.
    // There must be one neighbor for each node, they can't be two neighbors of only one node.

// How to find the two maximum neighbors:
  // 1. Get all shared neighbors between the two original nodes.
  // 2. Get the maximum unique (not a neighbor of v) neighbor for the first node.
  // 3. Get the maximum unique (not a neighbor of u) neighbor for the second node.
  // 4. Dedupe and sort the neighbors by score.
  // 5. The first two neighbors after deduping and sorting are the two maximum neighbors.
  // Why do we need to collect extra neighbors? 
    // In the case where we pick a shared neighbor, we may end up using the shared neighbor for the node with a larger second maximum neighbor than the other node.
    // Therefore, we want to account for the maximum unique neighbors for each node as well as account for the shared nodes.

// n = number of nodes, m = number of edges
// Time Complexity: O(n + m) 1064ms
// Space Complexity: O(n) 125.1MB
var maximumScore = function(scores, edges) {
  let n = scores.length, max = Array(n).fill(0).map(() => []);
  for (let [u, v] of edges) {
    max[u].push(v);
    max[v].push(u);
    max[u].sort((a, b) => scores[b] - scores[a]);
    max[v].sort((a, b) => scores[b] - scores[a]);
    if (max[u].length > 3) max[u].pop();
    if (max[v].length > 3) max[v].pop();
  }
  
  let maxScore = -Infinity;
  for (let [u, v] of edges) {
    let neighbors = [];
    let uHasUniqueNeighbor = false;
    for (let nei of max[u]) {
      if (nei === u || nei === v) continue; // neighbors can't be the original nodes
      if (max[v].includes(nei)) neighbors.push(nei); // get shared neighbors
      else if (!uHasUniqueNeighbor) { // get maximum unique neighbor of u
        uHasUniqueNeighbor = true;
        neighbors.push(nei);
      }
    }
    let vHasUniqueNeighbor = false;
    for (let nei of max[v]) {
      if (nei === u || nei === v) continue; // neighbors can't be the original nodes
      if (!max[u].includes(nei) && !vHasUniqueNeighbor) { // get maximum unique neighbor of v
        vHasUniqueNeighbor = true;
        neighbors.push(nei);
        break;
      }
    }
    neighbors = [...new Set(neighbors)].sort((a, b) => scores[b] - scores[a]);
    if (neighbors.length < 2) continue;
    let score = scores[u] + scores[v] + scores[neighbors[0]] + scores[neighbors[1]];
    maxScore = Math.max(maxScore, score);
  }
  return maxScore === -Infinity ? -1 : maxScore;
};

// Two test cases
console.log(maximumScore([5,2,9,8,4], [[0,1],[1,2],[2,3],[0,2],[1,3],[2,4]])) // 24
console.log(maximumScore([9,20,6,4,11,12], [[0,3],[5,3],[2,4],[1,3]])) // -1