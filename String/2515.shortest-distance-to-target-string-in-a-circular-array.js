// 2515. Shortest Distance to Target String in a Circular Array
// You are given a 0-indexed circular string array words and a string target. A circular array means that the array's end connects to the array's beginning.
  // Formally, the next element of words[i] is words[(i + 1) % n] and the previous element of words[i] is words[(i - 1 + n) % n], where n is the length of words.
// Starting from startIndex, you can move to either the next word or the previous word with 1 step at a time.
// Return the shortest distance needed to reach the string target. If the string target does not exist in words, return -1.


// Solution: 

// For each words[i] === target,
  // Calculate the distance to reach it in both directions:
    // Without crossing the edge: Math.abs(startIndex - i)
    // Crossing the edge: n - Math.abs(startIndex - i)

// Time Complexity: O(n) 77ms
// Space Complexity: O(1) 45.1MB
var closetTarget = function(words, target, startIndex) {
  let n = words.length, ans = Infinity;
  for (let i = 0; i < n; i++) {
    if (words[i] === target) {
      let dist = Math.abs(startIndex - i);
      ans = Math.min(ans, dist, n - dist);
    }
  }
  return ans === Infinity ? -1 : ans;
};

// Two test cases
console.log(closetTarget(["hello","i","am","leetcode","hello"], "hello", 1)) // 1
console.log(closetTarget(["a","b","leetcode"], "leetcode", 0)) // 1