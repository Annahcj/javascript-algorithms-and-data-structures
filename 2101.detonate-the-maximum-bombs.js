// 2101. Detonate the Maximum Bombs
// You are given a list of bombs. The range of a bomb is defined as the area where its effect can be felt. This area is in the shape of a circle with the center as the location of the bomb.
// The bombs are represented by a 0-indexed 2D integer array bombs where bombs[i] = [xi, yi, ri]. xi and yi denote the X-coordinate and Y-coordinate of the location of the ith bomb, whereas ri denotes the radius of its range.
// You may choose to detonate a single bomb. When a bomb is detonated, it will detonate all bombs that lie in its range. These bombs will further detonate the bombs that lie in their ranges.
// Given the list of bombs, return the maximum number of bombs that can be detonated if you are allowed to detonate only one bomb.


// Solution 1: Graph & DFS

// 1. Build a directed graph for all the bombs, 
  // bombs[i] is connected to bombs[j] if the distance between the two points are smaller than or equal to the radius of bombs[i].
// 2. Recursively DFS from each bomb and record the maximum number of points reached from each bomb.

// Time Complexity: O(n^2) 370ms
// Space Complexity: O(n^2) 50.7MB
var maximumDetonation = function(bombs) {
  let n = bombs.length, graph = Array(n).fill(0).map(() => []);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      let [x1, y1, radius] = bombs[i], [x2, y2] = bombs[j];
      if (getDist([x1, y1], [x2, y2]) <= radius) {
        graph[i].push(j);
      }
    }
  }
  let ans = 0;
  for (let i = 0; i < n; i++) {
    ans = Math.max(ans, dfs(i, Array(n).fill(0)));
  }
  return ans;
  
  function dfs(node, seen) {
    if (seen[node]) return 0;
    seen[node] = 1;
    if (graph[node].length === 0) return 1;
    let ans = 0;
    for (let nei of graph[node]) {
      ans += dfs(nei, seen);
    }
    return ans + 1;
  }
  
  function getDist(p1, p2) {
    let [x1, y1] = p1, [x2, y2] = p2;
    let calc1 = (x2 - x1) * (x2 - x1), calc2 = (y2 - y1) * (y2 - y1);
    return Math.sqrt(calc1 + calc2);
  }
};


// Solution 2: Graph & BFS

// The same as solution 1, except using BFS instead of DFS.

// Time Complexity: O(n^2) 385ms
// Space Complexity: O(n^2) 51.9MB
var maximumDetonation = function(bombs) {
  let n = bombs.length, graph = Array(n).fill(0).map(() => []);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      let [x1, y1, radius] = bombs[i], [x2, y2] = bombs[j];
      if (getDist([x1, y1], [x2, y2]) <= radius) {
        graph[i].push(j);
      }
    }
  }
  let ans = 0;
  for (let i = 0; i < n; i++) {
    ans = Math.max(ans, bfs(i));
  }
  return ans;
  
  function bfs(node) {
    let seen = Array(n).fill(0), queue = [node], count = 0;
    seen[node] = 1;
    while (queue.length) {
      let node = queue.shift();
      count++;
      for (let nei of graph[node]) {
        if (seen[nei]) continue;
        queue.push(nei);
        seen[nei] = 1;
      }
    }
    return count;
  }
  
  function getDist(p1, p2) {
    let [x1, y1] = p1, [x2, y2] = p2;
    let calc1 = (x2 - x1) * (x2 - x1), calc2 = (y2 - y1) * (y2 - y1);
    return Math.sqrt(calc1 + calc2);
  }
};

// Three test cases to run function on
console.log(maximumDetonation([[2,1,3],[6,1,4]])) // 2
console.log(maximumDetonation([[1,1,5],[10,10,5]])) // 1
console.log(maximumDetonation([[1,2,3],[2,3,1],[3,4,2],[4,5,3],[5,6,4]])) // 5