// 834. Sum of Distances in Tree
// Frequency: 42.90%
// There is an undirected connected tree with n nodes labeled from 0 to n - 1 and n - 1 edges.
// You are given the integer n and the array edges where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the tree.
// Return an array answer of length n where answer[i] is the sum of the distances between the ith node in the tree and all other nodes.


// Solution: Two DFSs

// Observe that when moving from a parent node to a child node, the sum of distances from the child node is the same, except that we are:
  // One node closer to all nodes in the subtree of the child node (than when the parent node was the root).
  // One node further to all nodes NOT in the subtree of the child node.

// We need to find:
  // 1. The total sum of distances from the root (0).
  // 2. The count of nodes in each subtree.

// Perform two DFSs over the tree.
  // 1. Use post-order DFS to find the total sum of distances from the root, and the count of nodes in each subtree.
  // 2. Use DFS to calculate the final sum of distances from every node, using the information already calculated from each parent node, starting from the root node.

// Time Complexity: O(n) 327ms
// Space Complexity: O(n) 89MB
var sumOfDistancesInTree = function(n, edges) {
  let graph = Array(n).fill(0).map(() => []);
  for (let [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }
  let distSum = Array(n), count = Array(n);
  populateDistAndCount(0, -1);
  getActualDist(0, -1);
  return distSum;
  
  function populateDistAndCount(node, parent) {
    let currDistSum = 0, currCount = 1;
    for (let nei of graph[node]) {
      if (nei === parent) continue;
      let [neiDist, neiCount] = populateDistAndCount(nei, node);
      currDistSum += neiCount + neiDist;
      currCount += neiCount;
    }
    distSum[node] = currDistSum;
    count[node] = currCount;
    return [currDistSum, currCount];
  }
  
  function getActualDist(node, parent) {
    for (let nei of graph[node]) {
      if (nei === parent) continue;
      distSum[nei] = distSum[node] - count[nei] + (n - count[nei]);
      getActualDist(nei, node);
    }
  }
};

// Three test cases 
console.log(sumOfDistancesInTree(6, [[0,1],[0,2],[2,3],[2,4],[2,5]])) // [8,12,6,10,10,10]
console.log(sumOfDistancesInTree(1, [])) // [0]
console.log(sumOfDistancesInTree(2, [[1,0]])) // [1,1]