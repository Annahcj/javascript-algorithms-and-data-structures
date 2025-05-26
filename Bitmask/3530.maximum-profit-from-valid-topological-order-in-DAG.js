// 3530. Maximum Profit from Valid Topological Order in DAG
// You are given a Directed Acyclic Graph (DAG) with n nodes labeled from 0 to n - 1, represented by a 2D array edges, where edges[i] = [ui, vi] indicates a directed edge from node ui to vi. Each node has an associated score given in an array score, where score[i] represents the score of node i.
// You must process the nodes in a valid topological order. Each node is assigned a 1-based position in the processing order.
// The profit is calculated by summing up the product of each node's score and its position in the ordering.
// Return the maximum possible profit achievable with an optimal topological order.
// A topological order of a DAG is a linear ordering of its nodes such that for every directed edge u → v, node u comes before v in the ordering.


// Solution: DP w/ Bitmasks

// DP with bitmasks to keep track of nodes we have already visited.
// For every dp(mask), 
  // iterate through each node we haven't visited, as the next node
  // and check that all prerequisites have already been visited.

// Finding prerequisites for each node:
  // We only need to know the direct parents of each node, 
  // because if those direct parents have been visited, that means the parent's parents would have been visited too.

// Time Complexity: O(n * 2^n) 3323ms
// Space Complexity: O(2^n) 276MB
function maxProfit(n, edges, score) {
  const prereq = Array(n).fill(0);
  for (let [u, v] of edges) {
    prereq[v] |= (1 << u);
  }
  const fullMask = (1 << n) - 1;
  const memo = new Map();
  return dp(0, 1);

  function dp(mask, pos) {
    if (mask === fullMask) return 0;
    if (memo.has(mask)) return memo.get(mask);

    let maxProfit = 0;
    for (let i = 0; i < n; i++) {
      const alreadyVisited = mask & (1 << i);
      const hasPrereqs = (mask & prereq[i]) === prereq[i];
      if (alreadyVisited || !hasPrereqs) continue;
      maxProfit = Math.max(maxProfit, pos * score[i] + dp(mask | (1 << i), pos + 1));
    }
    memo.set(mask, maxProfit);
    return maxProfit;
  }  
};

// Two test cases
console.log(maxProfit(2, [[0,1]], [2,3])) // 8
console.log(maxProfit(3, [[0,1],[0,2]], [1,6,3])) // 25