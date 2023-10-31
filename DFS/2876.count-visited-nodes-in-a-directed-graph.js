// 2876. Count Visited Nodes in a Directed Graph
// There is a directed graph consisting of n nodes numbered from 0 to n - 1 and n directed edges.
// You are given a 0-indexed array edges where edges[i] indicates that there is an edge from node i to node edges[i].
// Consider the following process on the graph:
  // You start from a node x and keep visiting other nodes through edges until you reach a node that you have already visited before on this same process.
// Return an array answer where answer[i] is the number of different nodes that you will visit if you perform the process starting from node i.


// Solution: Postorder DFS

// 1. Each connected component will contain exactly one strongly connected component.
  // No nodes can leave a cycle, they can only lead to a cycle or be in a cycle.
// 2. All nodes within a cycle have the same reachable count, since they can't leave the cycle.

// Use postorder DFS to count the number of reachable nodes starting from each node.
// Keep track of two arrays: 
  // count: moves[i] = number of moves away from the starting node - used to find the length of each cycle.
  // ans: ans[i] will be populated if we have finished iterating the entire path starting from node i.

// dfs(node, currMoves) will return [reachable nodes count, cycle's start index]
  // Nodes in a cycle: If currMoves >= cycle's start index, we are still within the cycle.
  // Nodes before a cycle: currMoves < cycle's start index.

// For nodes in a cycle, populate each ans[node] with the length of the cycle.
// For nodes before a cycle, we want to add 1 to the reachable nodes count.

// Time Complexity: O(n) 339ms
// Space Complexity: O(n) 113.6MB
var countVisitedNodes = function(edges) {
  let n = edges.length, moves = Array(n).fill(0), ans = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    dfs(i, 1);
  }
  return ans;
  
  function dfs(node, currMoves) { // returns [reachable nodes, cycle start index]
    if (ans[node] !== 0) return [ans[node], Infinity]; // definitely not a cycle, entire path has already been traversed
    if (moves[node] !== 0) {
      let cycleLen = currMoves - moves[node]; // found the entry of a cycle, now this value can be populated to all nodes in the cycle
      ans[node] = cycleLen;
      return [cycleLen, moves[node]];
    }
    
    moves[node] = currMoves;
    let [reachableNodes, cycleStartIndex] = dfs(edges[node], currMoves + 1);
    let isInCycle = currMoves >= cycleStartIndex;
    let newReachableNodes = isInCycle ? reachableNodes : reachableNodes + 1;
    ans[node] = newReachableNodes;
    return [newReachableNodes, cycleStartIndex];
  }
};

// Two test cases
console.log(countVisitedNodes([1,2,0,0])) // [3,3,3,4]
console.log(countVisitedNodes([1,2,3,4,0])) // [5,5,5,5,5]