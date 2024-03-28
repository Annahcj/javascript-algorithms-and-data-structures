// 3067. Count Pairs of Connectable Servers in a Weighted Tree Network
// You are given an unrooted weighted tree with n vertices representing servers numbered from 0 to n - 1, an array edges where edges[i] = [a[i], b[i], weight[i]] represents a bidirectional edge between vertices ai and bi of weight weighti. You are also given an integer signalSpeed.
// Two servers a and b are connectable through a server c if:
  // a < b, a != c and b != c.
  // The distance from c to a is divisible by signalSpeed.
  // The distance from c to b is divisible by signalSpeed.
  // The path from c to b and the path from c to a do not share any edges.
// Return an integer array count of length n where count[i] is the number of server pairs that are connectable through the server i.


// Solution: DFS

// Since it is a tree, we can use DFS starting from each node, acting like it is the root of the tree and traversing downwards.
// Each individual "root" can be dealt with separately.
// For each node as the root,
  // Traverse each child subtree and calculate the number of divisible path sums starting from this child node.
  // Keep track of a global count of divisible paths (paths divisible by signalSpeed) from paths starting from other child nodes. 
  // This global count will be used to count connectable paths between nodes in this child subtree and other child subtrees: total divisible paths * current child subtree's divisible paths
  // Note: We need a global and local count of divisible paths because we can't can't create a connectable path between nodes with shared edges (which would be the case if we start from the same child).
  // After traversing one child subtree, add the local divisible path count to the global count.

// Note: Since the total distance needs to be divisible by signalSpeed, we only need to know the sum % signalSpeed.

// n = number of nodes
// Time Complexity: O(n^2) 327ms
// Space Complexity: O(n) 60.5MB
var countPairsOfConnectableServers = function(edges, signalSpeed) {
  let n = edges.length + 1, graph = Array(n).fill(0).map(() => []);
  for (let [a, b, weight] of edges) {
    graph[a].push([b, weight]);
    graph[b].push([a, weight]);
  }
  
  let ans = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let totalDivisiblePaths = 0; // count of path sums % signalSpeed === 0
    for (let [child, weight] of graph[i]) {
      let pathsWithZeroSum = dfs(child, i, weight % signalSpeed, totalDivisiblePaths);
      ans[i] += totalDivisiblePaths * pathsWithZeroSum;
      totalDivisiblePaths += pathsWithZeroSum;
    }
  }
  return ans;
  
  // returns total number of paths with sum divisible by signalSpeed
  function dfs(node, parent, sum, totalDivisiblePaths) {
    let pathsWithZeroSum = sum === 0 ? 1 : 0;
    for (let [nei, weight] of graph[node]) {
      if (nei === parent) continue;
      const newSum = (sum + weight) % signalSpeed;
      pathsWithZeroSum += dfs(nei, node, newSum, totalDivisiblePaths);
    }
    return pathsWithZeroSum;
  }
};

// Two test cases
console.log(countPairsOfConnectableServers([[0,1,1],[1,2,5],[2,3,13],[3,4,9],[4,5,2]], 1)) // [0,4,6,6,4,0]
console.log(countPairsOfConnectableServers([[0,6,3],[6,5,3],[0,3,1],[3,2,7],[3,1,6],[3,4,2]], 3)) // [2,0,0,0,0,0,2]