// 1766. Tree of Coprimes
// There is a tree (i.e., a connected, undirected graph that has no cycles) consisting of n nodes numbered from 0 to n - 1 and exactly n - 1 edges. Each node has a value associated with it, and the root of the tree is node 0.
// To represent this tree, you are given an integer array nums and a 2D array edges. Each nums[i] represents the ith node's value, and each edges[j] = [u[j], v[j]] represents an edge between nodes uj and vj in the tree.
// Two values x and y are coprime if gcd(x, y) == 1 where gcd(x, y) is the greatest common divisor of x and y.
// An ancestor of a node i is any other node on the shortest path from node i to the root. A node is not considered an ancestor of itself.
// Return an array ans of size n, where ans[i] is the closest ancestor to node i such that nums[i] and nums[ans[i]] are coprime, or -1 if there is no such ancestor.


// Solution: DFS

// Perform a DFS through the tree starting from 0, keeping track of the lowest ancestor for every value.
// Again, since nums[i] <= 50, we can keep an array of size 50, lowestAncestor, where lowestAncestor[i] = lowest ancestor with value i.
// For every dfs(node, parent, lowestAncestor, depth), we only need to iterate through values 1 to 50 to find the lowest ancestor out of all coprime values.
// It is much more efficient to loop through the 50 values instead of looping through every parent node.

// Time Complexity: O(50n) 437ms
// Space Complexity: O(n) 128.63MB
function getCoprimes(nums, edges) {
  const n = nums.length, graph = Array(n).fill(0).map(() => []);
  const max = Math.max(...nums);
  for (let [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }
  const ans = Array(n).fill(-1);
  const lowestAncestor = Array(max + 1).fill(0).map(() => ({node: -1, depth: -1}));
  dfs(0, -1, lowestAncestor, 0);
  return ans;

  function dfs(node, parent, lowestAncestor, depth) {
    const prevLowestAncestor = lowestAncestor[nums[node]];
    let lowestCoprimeAncestor = {node: -1, depth: -1};
    for (let i = 1; i <= max; i++) {
      if (gcd(i, nums[node]) !== 1) continue;
      if (lowestAncestor[i].depth > lowestCoprimeAncestor.depth) {
        lowestCoprimeAncestor = {node: lowestAncestor[i].node, depth: lowestAncestor[i].depth};
      }
    }
    lowestAncestor[nums[node]] = {node, depth};
    for (let nei of graph[node]) {
      if (nei === parent) continue;
      dfs(nei, node, lowestAncestor, depth + 1);
    }
    lowestAncestor[nums[node]] = prevLowestAncestor;
    ans[node] = lowestCoprimeAncestor.node;
  }
};

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

// Two test cases
console.log(getCoprimes([2,3,3,2], [[0,1],[1,2],[1,3]])) // [-1,0,0,1]
console.log(getCoprimes([5,6,10,2,3,6,15], [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]])) // [-1,0,-1,0,0,0,-1]