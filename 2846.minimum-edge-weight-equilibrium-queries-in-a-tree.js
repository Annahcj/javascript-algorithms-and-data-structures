// 2846. Minimum Edge Weight Equilibrium Queries in a Tree
// There is an undirected tree with n nodes labeled from 0 to n - 1. You are given the integer n and a 2D integer array edges of length n - 1, where edges[i] = [ui, vi, wi] indicates that there is an edge between nodes ui and vi with weight wi in the tree.
// You are also given a 2D integer array queries of length m, where queries[i] = [ai, bi]. For each query, find the minimum number of operations required to make the weight of every edge on the path from ai to bi equal. In one operation, you can choose any edge of the tree and change its weight to any value.
// Note that:
  // Queries are independent of each other, meaning that the tree returns to its initial state on each new query.
  // The path from ai to bi is a sequence of distinct nodes starting with node ai and ending with node bi such that every two adjacent nodes in the sequence share an edge in the tree.
// Return an array answer of length m where answer[i] is the answer to the ith query.


// Solution: LCA w/ Binary Lifting

// Any node can be the root of the tree in an undirected graph with n - 1 edges.

// Keep track of the following:
  // character counts for paths: counts[node][char] = count of the character `char` in the path from root to node
  // direct parents of nodes: directParent[node] = the direct parent of node
  // parents of nodes for binary lifting: p[i][node] = the 2^ith parent of node
  // depths of each node: depths[node] = the depth of node

// For each query,
  // 1. Use binary lifting to find the LCA of (a, b). We will also need to keep track of the depth of each node.
    // a. Make (a, b) have equal depths. Move the lower node up by powers of 2 until they are at the same level.
    // b. Move both (a, b) up by powers of 2 if the 2^ith parents of both nodes are not equal. At the end of this process the direct parent of both nodes will be the LCA of (a, b).
  // 2. Get the difference of the prefix counts of node a and b with the LCA's prefix counts, then combine the counts of node a and b.
  // 3. Calculate and record the minimum cost to turn all the counts into the same weights.

// n = number of nodes, m = number of edges, q = number of queries
// Time Complexity: O(n log(n) + m + q log(n)) 545ms
// Space Complexity: O(n log(n) + m + q) 94.9MB
var minOperationsQueries = function(n, edges, queries) {
  let [directParents, counts, depths] = getParentsAndPrefixCounts(n, edges);
  let maxDepth = Math.ceil(Math.log2(n)), p = Array(maxDepth + 1).fill(0).map(() => Array(n).fill(-1));
  // precomputation for binary lifting
  for (let node = 0; node < n; node++) {
    p[0][node] = directParents[node];
  }
  for (let pow2 = 1; pow2 <= maxDepth; pow2++) {
    for (let node = 0; node < n; node++) {
      let halfParent = p[pow2 - 1][node]; 
      p[pow2][node] = halfParent === -1 ? -1 : p[pow2 - 1][halfParent]; 
    }
  }
  
  let ans = [];
  for (let [a, b] of queries) {
    let lca = getLCA(p, depths, maxDepth, a, b);
    let countsA = diffCounts(counts[a], counts[lca]), countsB = diffCounts(counts[b], counts[lca]);
    let totalCounts = addCounts(countsA, countsB);
    let edgesInPath = depths[a] - depths[lca] + depths[b] - depths[lca];
    let maxCount = 0;
    for (let i = 1; i <= 26; i++) {
      maxCount = Math.max(maxCount, totalCounts[i]);
    }
    ans.push(edgesInPath - maxCount); // turn all other non-majority weights into the weight with the most occurances
  }
  return ans;
};

function addCounts(countsA, countsB) {
  let total = Array(27);
  for (let i = 1; i <= 26; i++) {
    total[i] = countsA[i] + countsB[i];
  }
  return total;
}

function diffCounts(countsA, countsLCA) {
  let diff = Array(27);
  for (let i = 1; i <= 26; i++) {
    diff[i] = countsA[i] - countsLCA[i];
  }
  return diff;
}

function getLCA(p, depths, maxDepth, a, b) {
  if (depths[a] > depths[b]) {
    let temp = a;
    a = b;
    b = temp;
  }

  // bring both nodes up to the same depth
  let depthDiff = depths[b] - depths[a];
  for (let i = 0; i <= maxDepth; i++) {
    if ((depthDiff >> i) & 1) {
      b = p[i][b]; // move b up to the 2^ith parent
    }
  }
  if (a === b) return a;

  // move both nodes up by 2^ith levels if the 2^ith parents are not equal
  for (let i = maxDepth; i >= 0; i--) { // this decrements so that we can jump the nodes up incrementally
    if (p[i][a] !== p[i][b]) { // if 2^ith parents of both nodes are not equal, we can safely both move up  
      a = p[i][a];
      b = p[i][b];
    }
  }
  return p[0][a];
}

function getParentsAndPrefixCounts(n, edges) {
  let directParents = Array(n).fill(-1);
  let graph = Array(n).fill(0).map(() => []);
  let prefixCounts = Array(n);
  for (let [u, v, w] of edges) {
    graph[u].push([v, w]);
    graph[v].push([u, w]);
  }
  let seen = Array(n).fill(false);
  seen[0] = true;
  let queue = [[0, Array(27).fill(0), 0]];
  let depths = Array(n);
  while (queue.length) {
    let [node, count, depth] = queue.shift();
    prefixCounts[node] = count;
    depths[node] = depth;
    
    for (let [nei, weight] of graph[node]) {
      if (seen[nei]) continue;
      let newCount = [...count];
      newCount[weight]++;
      seen[nei] = true;
      queue.push([nei, newCount, depth + 1]);
      directParents[nei] = node;
    }
  }
  return [directParents, prefixCounts, depths];
}

// Two test cases
console.log(minOperationsQueries(7, [[0,1,1],[1,2,1],[2,3,1],[3,4,2],[4,5,2],[5,6,2]], [[0,3],[3,6],[2,6],[0,6]])) // [0,0,1,3]
console.log(minOperationsQueries(8, [[1,2,6],[1,3,4],[2,4,6],[2,5,3],[3,6,6],[3,0,8],[7,0,2]], [[4,6],[0,4],[6,5],[7,4]])) // [1,2,2,3]