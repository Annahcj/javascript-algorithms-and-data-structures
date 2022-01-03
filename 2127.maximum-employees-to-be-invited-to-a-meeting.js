// 2127. Maximum Employees to Be Invited to a Meeting
// A company is organizing a meeting and has a list of n employees, waiting to be invited. They have arranged for a large circular table, capable of seating any number of employees.
// The employees are numbered from 0 to n - 1. Each employee has a favorite person and they will attend the meeting only if they can sit next to their favorite person at the table. The favorite person of an employee is not themself.
// Given a 0-indexed integer array favorite, where favorite[i] denotes the favorite person of the ith employee, return the maximum number of employees that can be invited to the meeting.


// Solution: DFS & Length of Longest Cycle

// First, create a reverse graph: because we need to find the longest chains backwards

// Return the max of two cases:
  // 1. Total sum of: Pairs of nodes who are each other's favorites + the longest chains connected to each node.
  // 2. The length of the longest cycle.

// Time Complexity: O(n) 635ms
// Space Complexity: O(n) 184.8MB
var maximumInvitations = function(favorite) {
  // create reverse graph
  let n = favorite.length, graph = {};
  for (var i = 0; i < n; i++) graph[i] = [];
  for (i = 0; i < n; i++) graph[favorite[i]].push(i);

  // Case 1: Sum of all chains
  let seen = Array(n).fill(-1); // seen[i] = -1 if not visited, otherwise length of longest chain
  let chains = 0;
  for (i = 0; i < n; i++) {
    if (seen[i] !== -1) continue;
    if (favorite[favorite[i]] === i) { // if they are each other's favorites
      let a = 0;
      seen[i] = 0, seen[favorite[i]] = 0;
      for (var neighbor of graph[i]) {
        if (neighbor === favorite[i]) continue;
        a = Math.max(a, dfs(neighbor)); // longest chain connected to a
      }
      let b = 0;
      for (var neighbor of graph[favorite[i]]) {
        if (neighbor === i) continue;
        b = Math.max(b, dfs(neighbor)); // longest chain connected to b
      }
      chains += a + b + 2; // longest chain connected to a + longest chain connected to b + pair of nodes
    }
  }

  function dfs(node) {
    if (seen[node] !== -1) return seen[node];
    let maxLen = 0;
    for (var neighbor of graph[node]) {
      maxLen = Math.max(maxLen, dfs(neighbor));
    }
    seen[node] = maxLen + 1;
    return seen[node];
  }

  // Case 2: find length of longest cycle, using favorite
  let maxCycleLen = 0;
  seen = Array(n).fill(0);
  for (i = 0; i < n; i++) {
    if (seen[i]) continue;
    let start = i, curr = i;

    let cycleLen = 0, currSet = new Set();
    while (!seen[curr]) { // keep following the links from favorites until we come across a visited node.
      seen[curr] = 1;
      cycleLen++;
      currSet.add(curr);
      curr = favorite[curr];
    }

    while (start !== curr) { // subtract counts of nodes that aren't part of the cycle
      cycleLen--;
      start = favorite[start];
    }
    maxCycleLen = Math.max(maxCycleLen, cycleLen); // find the max cycle length
  }
  
  return Math.max(chains, maxCycleLen); 
};

// Four test cases to run function on
console.log(maximumInvitations([1,2,3,4,1])) // 4
console.log(maximumInvitations([2,2,1,2])) // 3
console.log(maximumInvitations([1,2,0])) // 3
console.log(maximumInvitations([3,0,1,4,1])) // 4