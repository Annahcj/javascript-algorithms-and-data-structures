// 841. Keys and Rooms
// There are n rooms labeled from 0 to n - 1 and all the rooms are locked except for room 0. Your goal is to visit all the rooms. However, you cannot enter a locked room without having its key.
// When you visit a room, you may find a set of distinct keys in it. Each key has a number on it, denoting which room it unlocks, and you can take all of them with you to unlock the other rooms.
// Given an array rooms where rooms[i] is the set of keys that you can obtain if you visited room i, return true if you can visit all the rooms, or false otherwise.


// Solution 1: Recursive DFS

// Recursively DFS starting from room 0.
// Keep track of visited rooms with an array "seen".
// After traversal, check that every seen[i] = 1.

// Time Complexity: O(n) 95ms
// Space Complexity: O(n) 44.7MB
var canVisitAllRooms = function(rooms) {
  let n = rooms.length, seen = Array(n).fill(0);
  dfs(0);
  return seen.reduce((acc, curr) => acc + curr, 0) === n;
  
  function dfs(node) {
    seen[node] = 1;
    for (let nei of rooms[node]) {
      if (seen[nei]) continue;
      dfs(nei);
    }
  }
};

// Solution 2: Iterative DFS

// Use a stack to simulate recursion.

// Time Complexity: O(n) 122ms
// Space Complexity: O(n) 44.1MB
var canVisitAllRooms = function(rooms) {
  let n = rooms.length, seen = Array(n).fill(0);
  let stack = [0];
  seen[0] = 1;
  while (stack.length) {
    let node = stack.pop();
    for (let nei of rooms[node]) {
      if (seen[nei]) continue;
      stack.push(nei);
      seen[nei] = 1;
    }
  }
  return seen.reduce((acc, curr) => acc + curr, 0) === n;
};


// Solution 3: BFS

// We use a queue instead of a stack.

// Time Complexity: O(n) 76ms
// Space Complexity: O(n) 45.2MB
var canVisitAllRooms = function(rooms) {
  let n = rooms.length, seen = Array(n).fill(0);
  let queue = [0];
  seen[0] = 1;
  while (queue.length) {
    let node = queue.shift();
    for (let nei of rooms[node]) {
      if (seen[nei]) continue;
      queue.push(nei);
      seen[nei] = 1;
    }
  }
  return seen.reduce((acc, curr) => acc + curr, 0) === n;
};

// Two test cases to run function on
console.log(canVisitAllRooms([[1],[2],[3],[]])) // true
console.log(canVisitAllRooms([[1,3],[3,0,1],[2],[0]])) // false