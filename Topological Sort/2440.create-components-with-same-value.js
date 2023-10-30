// 2440. Create Components With Same Value
// There is an undirected tree with n nodes labeled from 0 to n - 1.
// You are given a 0-indexed integer array nums of length n where nums[i] represents the value of the ith node. You are also given a 2D integer array edges of length n - 1 where edges[i] = [a[i], b[i]] indicates that there is an edge between nodes a[i] and b[i] in the tree.
// You are allowed to delete some edges, splitting the tree into multiple connected components. Let the value of a component be the sum of all nums[i] for which node i is in the component.
// Return the maximum number of edges you can delete, such that every connected component in the tree has the same value.


// Solution: Topological Sort 

// The sum of each connected component must be a divisor of the total sum.
// For a sum x, the number of edges to delete = the number of connected components - 1 (total sum / sum - 1)

// To find whether we can get split the tree into components with sum x, 
// We can use topological sort starting from the leaves (nodes with only one edge).
// Push node values onto parent nodes. Because it is a tree, we can only go in one direction - to the parent.
  // 1. If the current node value is already equal to the sum, do nothing (we have found one connected component with the correct sum).
  // 2. Otherwise if adding the current value to the parent node exceeds the sum, return false (not possible to split).
  // 3. Otherwise if we are at the root node (there are 0 degrees) and the current node value is not equal to the sum, it is not possible to split.

// n = number of nodes, m = totalSum of values, k = number of valid sums
// Time Complexity: O(k * n + m) 1049ms
// Space Complexity: O(n) 76.9MB
var componentValue = function(nums, edges) {
  let totalSum = nums.reduce((sum, val) => sum + val), n = nums.length;
  let graph = Array(n).fill(0).map(() => []);
  let indegrees = Array(n).fill(0);
  for (let [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
    indegrees[a]++;
    indegrees[b]++;
  }
  for (let sum = 1; sum <= totalSum / 2; sum++) {
    if (totalSum % sum !== 0) continue;
    if (canSplit(sum)) return totalSum / sum - 1;
  }
  return 0;
  
  function canSplit(sum) {
    if (n === 1) return nums[0] === sum;
    let vals = [...nums], degrees = [...indegrees];
    let queue = [];
    for (let i = 0; i < n; i++) {
      if (graph[i].length === 1) {
        queue.push(i);
      }
    }
    while (queue.length) {
      let node = queue.shift();
      if (vals[node] > sum) return false;
      if (degrees[node] === 0) return vals[node] === sum;
      for (let nei of graph[node]) {
        if (vals[node] !== sum) vals[nei] += vals[node];
        if (--degrees[nei] === 1) {
          queue.push(nei);
        }
      }
    }
    return true;
  }
};

// Two test cases
console.log(componentValue([6,2,2,2,6], [[0,1],[1,2],[1,3],[3,4]])) // 2
console.log(componentValue([2], [])) // 0