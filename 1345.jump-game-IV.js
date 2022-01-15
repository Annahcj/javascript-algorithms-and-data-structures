// 1345. Jump Game IV
// Given an array of integers arr, you are initially positioned at the first index of the array.
// In one step you can jump from index i to index:
  // i + 1 where: i + 1 < arr.length.
  // i - 1 where: i - 1 >= 0.
  // j where: arr[i] == arr[j] and i != j.
// Return the minimum number of steps to reach the last index of the array.
// Notice that you can not jump outside of the array at any time.


// Solution: Level by level BFS

// Use level by level BFS to try out all possibilities.

// Thoughts:
  // 1. Since we use BFS, once we visit an index, there is absolutely no reason to visit it again.
  // 2. For each index, we will try to visit each next index where arr[idx] = arr[nextIdx], so we should populate these values in a hashmap.

// We never revisit the same index, so the time complexity is O(n).

// Time Complexity: O(n) 1373ms
// Space Complexity: O(n) 88.5MB
var minJumps = function(arr) {
  let n = arr.length, lastIdx = n - 1;
  let queue = [0], jumps = 0, seen = Array(n).fill(0);
  seen[0] = 1;
  
  let map = {};
  for (var j = 0; j < n; j++) { // populate
    if (!map[arr[j]]) map[arr[j]] = [];
    map[arr[j]].push(j);
  }
  
  while (queue.length) {
    let size = queue.length;
    for (var i = 0; i < size; i++) {
      let idx = queue.shift();
      if (idx === lastIdx) return jumps;
      if (idx + 1 < n) { // try to visit idx + 1
        if (!seen[idx + 1]) {
          queue.push(idx + 1);
          seen[idx + 1] = 1;
        }
      }
      if (idx - 1 >= 0) { // try to visit idx - 1
        if (!seen[idx - 1]) {
          queue.push(idx - 1);
          seen[idx - 1] = 1;
        }
      }
      for (var nextIdx of map[arr[idx]]) { // try to visit all next indexes where arr[idx] = arr[nextIdx]
        if (!seen[nextIdx]) {
          queue.push(nextIdx);
          seen[nextIdx] = 1;
        }
      }
      map[arr[idx]] = []; // clear out to avoid looping through again
    }
    jumps++;
  }
  return -1;
};

// Three test cases to run function on
console.log(minJumps([100,-23,-23,404,100,23,23,23,3,404])) // 3
console.log(minJumps([7])) // 0
console.log(minJumps([7,6,9,6,9,6,9,7])) // 1