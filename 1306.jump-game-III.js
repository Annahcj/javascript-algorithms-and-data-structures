// 1306. Jump Game III
// Given an array of non-negative integers arr, you are initially positioned at start index of the array. When you are at index i, you can jump to i + arr[i] or i - arr[i], check if you can reach to any index with value 0.
// Notice that you can not jump outside of the array at any time.


// Solution 1: Recursive DFS

// Recursive dfs to try all possible moves

// Time Complexity: O(n) 115ms
// Space Complexity: O(n) 48.8MB
var canReach = function(arr, start) {
  let n = arr.length;
  let visited = Array(n);
  return recurse(start);

  function recurse(idx) {
    if (idx < 0 || idx >= n || visited[idx]) return false;
    visited[idx] = true;
    if (arr[idx] === 0) return true;
    return recurse(idx + arr[idx]) || recurse(idx - arr[idx]);
  }
};

// Solution 2: BFS

// The same idea as the dfs solution, we just need to check whether the new index is in bounds and not visited. 
// Then, we push the new index to the queue and immediately mark it as visited. 

// Time Complexity: O(n) 108ms
// Space Complexity: O(n) 45.2MB
var canReach = function(arr, start) {
  let n = arr.length;
  let visited = Array(n);
  let queue = [start];
  while (queue.length) {
    let idx = queue.shift();
    if (arr[idx] === 0) return true;
    let forward = idx + arr[idx], backward = idx - arr[idx];
    if (forward < n && !visited[forward]) {
      queue.push(forward);
      visited[forward] = true;
    }
    if (backward >= 0 && !visited[backward]) {
      queue.push(backward);
      visited[backward] = true;
    }
  }
  return false;
};

// Three test cases to run function on
console.log(canReach([4,2,3,0,3,1,2], 5)) // true
console.log(canReach([4,2,3,0,3,1,2], 0)) // true
console.log(canReach([3,0,2,1,2], 2)) // false