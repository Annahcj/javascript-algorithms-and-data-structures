// 2508. Add Edges to Make Degrees of All Nodes Even
// There is an undirected graph consisting of n nodes numbered from 1 to n. You are given the integer n and a 2D array edges where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi. The graph can be disconnected.
// You can add at most two additional edges (possibly none) to this graph so that there are no repeated edges and no self-loops.
// Return true if it is possible to make the degree of each node in the graph even, otherwise return false.
// The degree of a node is the number of edges connected to it.


// Solution: Greedy

// Count the number of edges from each node.
// If the number of nodes with an odd number of degrees is odd, then it is impossible to make them all even because no matter how we use the two edges, we won't be able to make them all even.
// If there are more than 4 nodes with odd degrees, it is impossible to make them all even.

// The only other cases left are 0, 2, or 4.
// 0: Always true
// 2: If the two nodes don't already have an edge OR there is another node that both nodes are NOT connected to yet, then we can make them both even.
// 4: If there are two pairs of nodes that are not connected to one another, then we can make them all even.
  // Possible options:
    // (a, b) and (c, d) pairs are not connected
    // (a, c) and (b, d) pairs are not connected
    // (a, d) and (b, c) pairs are not connected
  // If not, it is impossible since we can only add up to 2 edges.

// Use a hashset to keep track of the neighbors of each node for quick lookup.

// n = number of nodes, m = number of edges
// Time Complexity: O(n + m) 435ms
// Space Complexity: O(n + m) 80.1MB
var isPossible = function(n, edges) {
  let degrees = Array(n + 1).fill(0), graph = Array(n + 1).fill(0).map(() => new Set());
  for (let [a, b] of edges) {
    degrees[a]++;
    degrees[b]++;
    graph[a].add(b);
    graph[b].add(a);
  }
  
  let oddNodes = [];
  for (let i = 1; i <= n; i++) {
    if (degrees[i] % 2 === 1) {
      oddNodes.push(i);
    }
  }
  if (oddNodes.length === 0) return true;
  if (oddNodes.length > 4 || oddNodes.length % 2 === 1) return false;

  if (oddNodes.length === 4) {
    let choices = [[0, 1, 2, 3], [0, 2, 1, 3], [0, 3, 1, 2]];
    for (let [a, b, c, d] of choices) {
      if (!graph[oddNodes[a]].has(oddNodes[b]) && !graph[oddNodes[c]].has(oddNodes[d])) {
        return true;
      }
    }
  } else { // 2 odd degree nodes
    if (!graph[oddNodes[0]].has(oddNodes[1])) return true;
    for (let i = 1; i <= n; i++) {
      if (i === oddNodes[0] || i === oddNodes[1]) continue;
      if (!graph[i].has(oddNodes[0]) && !graph[i].has(oddNodes[1])) return true;
    }
  }
  return false;
};

// Three test cases
console.log(isPossible(5, [[1,2],[2,3],[3,4],[4,2],[1,4],[2,5]])) // true
console.log(isPossible(4, [[1,2],[3,4]])) // true
console.log(isPossible(4, [[1,2],[1,3],[1,4]])) // false