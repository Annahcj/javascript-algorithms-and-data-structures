// 3015. Count the Number of Houses at a Certain Distance I
// You are given three positive integers n, x, and y.
// In a city, there exist houses numbered 1 to n connected by n streets. There is a street connecting the house numbered i with the house numbered i + 1 for all 1 <= i <= n - 1 . An additional street connects the house numbered x with the house numbered y.
// For each k, such that 1 <= k <= n, you need to find the number of pairs of houses (house1, house2) such that the minimum number of streets that need to be traveled to reach house2 from house1 is k.
// Return a 1-indexed array result of length n where result[k] represents the total number of pairs of houses such that the minimum streets required to reach one house from the other is k.
// Note that x and y can be equal.


// Solution 1: BFS

// First, build up a graph.
// From each city, perform BFS to find the shortest distance to each other city.

// Note: Assumes BFS takes O(n) time complexity, if using a real queue instead of an array.
// Time Complexity: O(n^2) 104ms
// Space Complexity: O(n) 57.8MB
var countOfPairs = function(n, x, y) {
  let graph = Array(n + 1).fill(0).map(() => []);
  for (let i = 1; i < n; i++) {
    graph[i].push(i + 1);
    graph[i + 1].push(i);
  }
  graph[x].push(y);
  graph[y].push(x);

  let result = Array(n).fill(0);
  for (let i = 1; i <= n; i++) {
    let queue = [i], moves = 0, seen = Array(n + 1).fill(false);
    seen[i] = true;
    while (queue.length) {
      for (let j = queue.length - 1; j >= 0; j--) {
        let node = queue.shift();
        if (moves > 0) result[moves - 1]++;
        for (let nei of graph[node]) {
          if (seen[nei]) continue;
          seen[nei] = true;
          queue.push(nei);
        }
      }
      moves++;
    }
  }
  return result;
};


// Solution 2: Logic

// There are two possible paths for each pair of nodes (i, j):
  // 1. Incrementally go from i -> j: j - i
  // 2. Go through (x, y) on the path: i -> x -> y -> j: Math.abs(i - x) + 1 + Math.abs(j - y)

// Take the minimum out of the two options.

// Time Complexity: O(n^2) 81ms
// Space Complexity: O(1) (excluding output) 42.9MB
var countOfPairs = function(n, x, y) {
  if (x > y) {
    let temp = x;
    x = y, y = temp;
  }
  let result = Array(n).fill(0);
  for (let i = 1; i <= n; i++) {
    for (let j = i + 1; j <= n; j++) {
      let incremental = j - i;
      let shortcut = Math.abs(i - x) + 1 + Math.abs(j - y);
      let minDist = Math.min(incremental, shortcut);
      if (minDist > 0) result[minDist - 1] += 2;
    }
  }  
  return result;
};

// Three test cases
console.log(countOfPairs(3, 1, 3)) // [6,0,0]
console.log(countOfPairs(5, 2, 4)) // [10,8,2,0,0]
console.log(countOfPairs(4, 1, 1)) // [6,4,2,0]