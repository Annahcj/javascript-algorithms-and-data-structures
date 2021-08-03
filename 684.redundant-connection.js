// 684. Redundant Connection
// In this problem, a tree is an undirected graph that is connected and has no cycles.
// You are given a graph that started as a tree with n nodes labeled from 1 to n, with one additional edge added. The added edge has two different vertices chosen from 1 to n, and was not an edge that already existed. The graph is represented as an array edges of length n where edges[i] = [ai, bi] indicates that there is an edge between nodes ai and bi in the graph.
// Return an edge that can be removed so that the resulting graph is a tree of n nodes. If there are multiple answers, return the answer that occurs last in the input.


// Solution: Union Find

// Algorithm:
// We loop through each edge in edges
  // a = edge[0], b = edge[1]
  // If parent of a (find(a)) is equal to parent of b (find(b)) (meaning they are already part of the same connected component), return edge.

  // find: (accepts one node : x)
    // If uf doesn't contain x, set uf[x] to x.
    // If uf[x] is equal to x, return x.
    // Otherwise, recursively call find. Return find(uf[x]) (keep following the value of uf[x] until we reach the parent/representative)

  // Otherwise, connect a and b using a function 'union'.
  // union: (accepts two nodes: x, y)
    // set uf[find(x)] (the parent/representative of x) to uf[find(y)] (the parent/representative of y).
  
// For e.g: edges = [[1,2],[2,3],[3,4],[1,4],[1,5]]
// edge: [1, 2], uf = {}
  // find(1) = 1, find(2) = 2
  // uf = {1:1, 2:2}
  // find(1) !== find(2), so union(1, 2)
  // uf = {1:2, 2:2}
// edge: [2, 3]
  // find(2) = 2, find(3) = 3
  // uf = {1:2, 2:2, 3:3}
  // find(2) !== find(3), so union(2, 3)
  // uf = {1:2, 2:3, 3:3}
// edge: [3, 4]
  // find(3) = 3, find(4) = 4
  // uf = {1:2, 2:3, 3:3, 4:4} 
  // find(3) !== find(4), so union(3, 4)
  // uf = {1:2, 2:3, 3:4, 4:4} 
// edge: [1, 4]
  // find(1) = find(2) = find(3) = find(4) = 4, find(4) = 4.
  // find(1) === find(4), so return edge ([1, 4])

// Time Complexity: O() 88ms
// Space Complexity: O() 41.8MB
  var findRedundantConnection = function(edges) {
    let uf = {};
    for (var edge of edges) {
      let [a, b] = edge;
      if (find(a) === find(b)) return edge;
      union(a, b);
    }
    function union(x, y) {
      uf[find(x)] = uf[find(y)];
    }
    function find(x) {
      if (!uf[x]) uf[x] = x;
      if (uf[x] === x) return x;
      return find(uf[x]);
    }
  };
  
  // Two test cases to run function on
  console.log(findRedundantConnection([[1,2],[1,3],[2,3]])) // [2,3]
  console.log(findRedundantConnection([[1,2],[2,3],[3,4],[1,4],[1,5]])) // [1,4]