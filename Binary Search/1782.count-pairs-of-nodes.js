// 1782. Count Pairs Of Nodes
// You are given an undirected graph defined by an integer n, the number of nodes, and a 2D integer array edges, the edges in the graph, where edges[i] = [ui, vi] indicates that there is an undirected edge between ui and vi. You are also given an integer array queries.
// Let incident(a, b) be defined as the number of edges that are connected to either node a or b.
// The answer to the jth query is the number of pairs of nodes (a, b) that satisfy both of the following conditions:
  // a < b
  // incident(a, b) > queries[j]
// Return an array answers such that answers.length == queries.length and answers[j] is the answer of the jth query.
// Note that there can be multiple edges between the same two nodes.


// Solution: Binary Search, Sorting & Hashmap 

// Count the indicent of (x, y): numEdges[x] + numEdges[y] - sharedEdges[x][y].
  // numEdges[node] = the number of edges to the node
  // sharedEdges[x][y] = the number of shared edges between nodes x and y.
    // Use a hashmap to count the number of shared edges.
    // KEY POINT: The hashmap will never be larger than the number of edges, whereas a 2D array would have to be size n * n.

// 1. Find the number of edges for each node and store the counts in an array numEdges.
// 2. Find the number of shared edges between pairs of nodes by looping through each edge and storing the count in a hashmap.
// 3. Sort the counts of edges in asc order (assign an index to each node [node index, number of edges] then sort).
// 4. For each query, 
  // a. Use binary search to find the number of pairs (i, j). 
    // Go through each index j.
    // Binary search for the smallest index i where edges[i] + edges[j] > query.
    // If edges[i] + edges[j] > queries[j], then we know that all pairs (i, j), (i + 1, j), (i + 2, j), ... up to (j - 1, j) will have sum larger than the query.
  // b. Eliminate pairs where upon subtracting the shared edges, the sum becomes less than or equal to the query.
    // Loop through each sharedEdges[x][y] and if numEdges[i] + numEdges[j] > queries[j] AND numEdges[i] + numEdges[j] - sharedEdges[x][y] <= queries[j], subtract a pair from the count.

// n = number of ndoes, m = number of edges, k = number of queries
// Time Complexity: O(m log(m) + k * (n log(n) + m)) 3203ms
// Space Complexity: O(n + m + k) 93.6MB
var countPairs = function(n, edges, queries) {
  let numEdges = Array(n).fill(0), sharedEdges = new Map();
  for (let i = 0; i < edges.length; i++) {
    let x = edges[i][0] - 1, y = edges[i][1] - 1;
    numEdges[x]++;
    numEdges[y]++;
    let key = `${Math.min(x, y)},${Math.max(x, y)}`;
    sharedEdges.set(key, (sharedEdges.get(key) || 0) + 1);
  }
  let sortedEdgesCount = numEdges
    .map((count, index) => [index, count])
    .sort((a, b) => a[1] - b[1]);
  
  let answers = [];
  for (let query of queries) {
    let pairs = 0;
    for (let j = 1; j < n; j++) { // count the number of pairs ending with j
      let i = lower_bound(sortedEdgesCount, j, query);
      pairs += j - i;
    }
    for (let [key, sharedEdgesCount] of sharedEdges) { // eliminate pairs with not enough edges 
      let [x, y] = key.split(",").map((n) => Number(n));
      if (numEdges[x] + numEdges[y] > query && numEdges[x] + numEdges[y] - sharedEdgesCount <= query) {
        pairs--;
      }
    }
    answers.push(pairs);
  }
  return answers;
  
  function lower_bound(sortedEdgesCount, j, query) {
    let low = 0, high = j;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (sortedEdgesCount[mid][1] + sortedEdgesCount[j][1] > query) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }
    return low;
  }
};

// Two test cases
console.log(countPairs(4, [[1,2],[2,4],[1,3],[2,3],[2,1]], [2,3])) // [6,5]
console.log(countPairs(5, [[1,5],[1,5],[3,4],[2,5],[1,3],[5,1],[2,3],[2,5]], [1,2,3,4,5])) // [10,10,9,8,6]