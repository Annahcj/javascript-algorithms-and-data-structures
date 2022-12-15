// 457. Circular Array Loop
// You are playing a game involving a circular array of non-zero integers nums. Each nums[i] denotes the number of indices forward/backward you must move if you are located at index i:
  // If nums[i] is positive, move nums[i] steps forward, and
  // If nums[i] is negative, move nums[i] steps backward.
// Since the array is circular, you may assume that moving forward from the last element puts you on the first element, and moving backwards from the first element puts you on the last element.
// A cycle in the array consists of a sequence of indices seq of length k where:
  // Following the movement rules above results in the repeating index sequence seq[0] -> seq[1] -> ... -> seq[k - 1] -> seq[0] -> ...
  // Every nums[seq[j]] is either all positive or all negative.
  // k > 1
// Return true if there is a cycle in nums, or false otherwise.


// Solution: Two Hashsets

// Go through each nums[i].
  // Traverse the path starting from nums[i].
  // Consider forward and backward paths separately.
  // Keep track of two sets (globally visited, locally visited).
  // Mark every node that we visit as seen both globally and locally.
  // If we visit a node we have already seen in the current path (locally), we have a cycle.

// Before we start traversing a path, check if we have already visited nums[i] globally. If we have, skip it (we don't need to traverse it again since we already traversed the full path).

// Time Complexity: O(n) 71ms
// Space Complexity: O(n) 41.9MB
var circularArrayLoop = function(nums) {
  let n = nums.length, globalVisited = new Set();
  for (let i = 0; i < n; i++) {
    if (globalVisited.has(i)) continue;
    let isPositive = nums[i] > 0;
    let index = i, len = 1;
    globalVisited.add(index);
    let visited = new Set([index]);
    while (getNextIndex(index, nums[index]) !== index) {
      let nextIndex = getNextIndex(index, nums[index]);
      if (nums[index] > 0 !== isPositive) break; // path has a different direction
      if (visited.has(nextIndex)) { // node has already been visited in the current path (visited locally)
        if (len > 1) {
          return true; 
        }
        break;
      }
      len++;
      visited.add(nextIndex);
      globalVisited.add(nextIndex);
      index = nextIndex;
    }
  }
  return false;
  
  function getNextIndex(index) {
    return (((index + nums[index]) % n) + n) % n;
  }
};

// Three test cases
console.log(circularArrayLoop([2,-1,1,2,2])) // true
console.log(circularArrayLoop([-1,-2,-3,-4,-5,6])) // false
console.log(circularArrayLoop([1,-1,5,1,4])) // true