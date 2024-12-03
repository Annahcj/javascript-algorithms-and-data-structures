// 3367. Maximize Sum of Weights after Edge Removals
// There exists an undirected tree with n nodes numbered 0 to n - 1. You are given a 2D integer array edges of length n - 1, where edges[i] = [u[i], v[i], w[i]] indicates that there is an edge between nodes u[i] and v[i] with weight w[i] in the tree.
// Your task is to remove zero or more edges such that:
  // Each node has an edge with at most k other nodes, where k is given.
  // The sum of the weights of the remaining edges is maximized.
// Return the maximum possible sum of weights for the remaining edges after making the necessary removals.


// Solution: DFS

// DFS over the tree starting from node 0 and for every node, store the total score for every neighbor.
// Find the score taking k max neighbor results and the score taking k-1 max neighbor results.

// From every node, we have two choices for every edge:
  // 1. Take the edge and the neighbor can take at most k-1 neighbors (as neighbor's score does not include the edge with the parent node).
  // 2. Don't take the edge and the neighbor can take up to k neighbors.
// Calculate the sum after skipping all edges (so only taking neighbor results and no weights from current node), and store the differences between score of taking an edge vs the score of not taking it.
// After going through all edges for a node, take the top k differences and add them to the total skipped score.
// Return the score for taking top k neighbors, and top k-1 neighbors (needed for parent calls).

// Time Complexity: O(n log n) 932ms
// Space Complexity: O(n) 153MB
function maximizeSumOfWeights(edges, k) {
  let n = edges.length + 1, graph = Array(n).fill(0).map(() => []);
  for (let [u, v, w] of edges) {
    graph[u].push([v, w]);
    graph[v].push([u, w]);
  }
  return dfs(0, -1)[0];
  
  function dfs(node, parent) {
    let skippedSum = 0, diffs = [];
    for (let [nei, weight] of graph[node]) {
      if (nei === parent) continue;
      let [neiTopK, neiTopKMinusOne] = dfs(nei, node);
      skippedSum += neiTopK;
      diffs.push((weight + neiTopKMinusOne) - neiTopK);
    }
    diffs.sort((a, b) => b - a);
    let topKDiffs = 0, topKMinusOneDiffs = 0;
    for (let i = 0; i < Math.min(k, diffs.length); i++) {
      if (diffs[i] < 0) break;
      topKDiffs += diffs[i];
      if (i <= k - 2) {
        topKMinusOneDiffs = topKDiffs;
      }
    }
    return [skippedSum + topKDiffs, skippedSum + topKMinusOneDiffs];
  }  
};

// Two test cases
console.log(maximizeSumOfWeights([[0,1,4],[0,2,2],[2,3,12],[2,4,6]], 2)) // 22
console.log(maximizeSumOfWeights([[0,1,5],[1,2,10],[0,3,15],[3,4,20],[3,5,5],[0,6,10]], 3)) // 65