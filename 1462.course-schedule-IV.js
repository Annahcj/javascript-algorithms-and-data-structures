// 1462. Course Schedule IV
// There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course ai first if you want to take course bi.
  // For example, the pair [0, 1] indicates that you have to take course 0 before you can take course 1.
// Prerequisites can also be indirect. If course a is a prerequisite of course b, and course b is a prerequisite of course c, then course a is a prerequisite of course c.
// You are also given an array queries where queries[j] = [uj, vj]. For the jth query, you should answer whether course uj is a prerequisite of course vj or not.
// Return a boolean array answer, where answer[j] is the answer to the jth query.


// Solution: Topological Sort

// Go through each node using topological sort.
// Keep track of all ancestors of a node and transfer ancestors of a node to the next nodes.
// Populate ancestors, where ancestors[i] = the set of ancestors of node i.

// When we reaching a neighbor node j from node i (i -> j), transfer all ancestors from node i to node j.
// Once we have the ancestors of each node, we can process each query [x, y] by checking whether x is an ancestor of y.

// Why we need to process nodes using topological sort:
  // To have all the correct ancestors of a node, we need to exhaust all possible routes to it.
  // Only then can we transfer the ancestors over to the next nodes.

// n = number of courses, m = number of queries
// Time Complexity: O(n^2 + m) 302ms
// Space Complexity: O(n^2) (not including output space of O(m)) 54.4MB
var checkIfPrerequisite = function(n, prerequisites, queries) {
  let ancestors = Array(n).fill(0).map(() => new Set());
  let graph = Array(n).fill(0).map(() => []);
  let indegrees = Array(n).fill(0);
  for (let [x, y] of prerequisites) {
    graph[x].push(y);
    indegrees[y]++;
  }
  
  let queue = [];
  for (let i = 0; i < n; i++) {
    if (indegrees[i] === 0) queue.push(i);
  }
  
  while (queue.length) {
    let node = queue.shift();
    for (let nei of graph[node]) {
      ancestors[nei].add(node);
      for (let ancestor of ancestors[node]) ancestors[nei].add(ancestor);
      
      indegrees[nei]--;
      if (indegrees[nei] === 0) queue.push(nei);
    }
  }
  
  let res = [];
  for (let [x, y] of queries) {
    res.push(ancestors[y].has(x));
  }
  return res;
};

// Two test cases to run function on
console.log(checkIfPrerequisite(2, [[1,0]], [[0,1],[1,0]])) // [false, true]
console.log(checkIfPrerequisite(2, [], [[1,0],[0,1]])) // [false, false]