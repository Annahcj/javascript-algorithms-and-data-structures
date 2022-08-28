// 2392. Build a Matrix With Conditions
// You are given a positive integer k. You are also given:
  // a 2D integer array rowConditions of size n where rowConditions[i] = [above[i], below[i]], and
  // a 2D integer array colConditions of size m where colConditions[i] = [left[i], right[i]].
// The two arrays contain integers from 1 to k.
// You have to build a k x k matrix that contains each of the numbers from 1 to k exactly once. The remaining cells should have the value 0.
// The matrix should also satisfy the following conditions:
  // The number above[i] should appear in a row that is strictly above the row at which the number below[i] appears for all i from 0 to n - 1.
  // The number left[i] should appear in a column that is strictly left of the column at which the number right[i] appears for all i from 0 to m - 1.
// Return any matrix that satisfies the conditions. If no answer exists, return an empty matrix.


// Solution: Topological Sort 

// Use topological sort to find the order that each number should appear for both row and column conditions.
// If we can't process all nodes in the topological sort, that means we have a cycle and we return an empty matrix.

// Time Complexity: O(k^2) 299ms
// Space Complexity: O(k) (not including output) 61MB
var buildMatrix = function(k, rowConditions, colConditions) {
  let rowOrder = getOrder(k + 1, rowConditions);
  let colOrder = getOrder(k + 1, colConditions);
  if (rowOrder === -1 || colOrder === -1) return [];
  let matrix = Array(k).fill(0).map(() => Array(k).fill(0));
  let pos = Array(k + 1).fill(0).map(() => Array(2));
  for (let i = 0; i < k; i++) {
    pos[rowOrder[i]][0] = i;
    pos[colOrder[i]][1] = i;
  }
  for (let i = 1; i <= k; i++) {
    let [x, y] = pos[i];
    matrix[x][y] = i;
  }
  return matrix;
};

function getOrder(n, edges) {
  let indegrees = Array(n).fill(0);
  let graph = Array(n).fill(0).map(() => []);
  for (let [x, y] of edges) {
    graph[x].push(y);
    indegrees[y]++;
  }
  let queue = [];
  for (let i = 1; i < n; i++) {
    if (indegrees[i] === 0) queue.push(i);
  }

  let order = [];
  while (queue.length) {
    let node = queue.shift();
    order.push(node);
    for (let nei of graph[node]) {
      if (--indegrees[nei] === 0) queue.push(nei);
    }
  }
  return order.length === n - 1 ? order : -1;
}

// Two test cases to run function on
console.log(buildMatrix(3, [[1,2],[3,2]], [[2,1],[3,2]])) // [[3,0,0],[0,0,1],[0,2,0]]
console.log(buildMatrix(3, [[1,2],[2,3],[3,1],[2,3]], [[2,1]])) // []