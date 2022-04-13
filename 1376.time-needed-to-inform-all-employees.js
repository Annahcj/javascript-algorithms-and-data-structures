// 1376. Time Needed to Inform All Employees
// A company has n employees with a unique ID for each employee from 0 to n - 1. The head of the company is the one with headID.
// Each employee has one direct manager given in the manager array where manager[i] is the direct manager of the i-th employee, manager[headID] = -1. Also, it is guaranteed that the subordination relationships have a tree structure.
// The head of the company wants to inform all the company employees of an urgent piece of news. He will inform his direct subordinates, and they will inform their subordinates, and so on until all employees know about the urgent news.
// The i-th employee needs informTime[i] minutes to inform all of his direct subordinates (i.e., After informTime[i] minutes, all his direct subordinates can start spreading the news).
// Return the number of minutes needed to inform all the employees about the urgent news.


// Solution 1: BFS

// 1. Create a graph based on the manager array
// 2. Traverse the 'tree' using BFS and get the latest time an employee is informed

// We can think of it as a tree since a node can only have one parent.

// Time Complexity: O(n) 386ms
// Space Complexity: O(n) 81.4MB
var numOfMinutes = function(n, headID, manager, informTime) {
  let graph = Array(n);
  for (let i = 0; i < n; i++) graph[i] = [];
  for (let i = 0; i < n; i++) {
    if (manager[i] === -1) continue;
    graph[manager[i]].push(i);
  }
  
  let res = 0;
  let queue = [[headID, 0]];
  while (queue.length) {
    let [node, time] = queue.shift();
    res = Math.max(res, time);
    for (let nei of graph[node]) {
      queue.push([nei, time + informTime[node]]);
    }
  }
  return res;
};


// Solution 2: Recursive DFS

// Same as solution 1: build the graph, then get the latest time an employee is informed.
// When we reach a leaf node (node with no children), return 0.
// For each node, return the maximum of each dfs(neighbor) + informTime[node].

// Time Complexity: O(n) 298ms
// Space Complexity: O(n) 76.8MB
var numOfMinutes = function(n, headID, manager, informTime) {
  let graph = Array(n);
  for (let i = 0; i < n; i++) graph[i] = [];
  for (let i = 0; i < n; i++) {
    if (manager[i] === -1) continue;
    graph[manager[i]].push(i);
  }
  return dfs(headID);
  
  function dfs(node) {
    if (!graph[node].length) return 0;
    let ans = 0;
    for (let nei of graph[node]) {
      ans = Math.max(ans, dfs(nei) + informTime[node]);
    }
    return ans;
  }
};

// Two test cases to run function on
console.log(numOfMinutes(1, 0, [-1], [0])) // 0
console.log(numOfMinutes(6, 2, [2,2,-1,2,2,2], [0,0,1,0,0,0])) // 1