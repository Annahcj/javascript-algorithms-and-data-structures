// 1055. Shortest Way to Form String
// A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).
// Given two strings source and target, return the minimum number of subsequences of source such that their concatenation equals target. If the task is impossible, return -1.


// Solution 1: Greedy

// Time Complexity: O(nm) 60ms
// Space Complexity: O(1) 39.1MB
var shortestWay = function(source, target) {
  let i = 0, ans = 0;
  while (i < target.length) {
    let matched = false;
    // greedily match as many characters as possible in source
    for (var j = 0; j < source.length; j++) {
      if (source[j] === target[i]) {
        i++;
        matched = true;
      }
    }
    // if not even one character was matched, return -1, otherwise increment ans by one.
    if (matched) ans++;
    else return -1;
  }
  return ans;
};

// Solution 2: Binary Search

// 1. Store indexes of each character in a hashmap -> "abcac" = {a: [0,3], b: [1], c: [2,4]}
// 2. For every character in target, binary search for the first index greater than the current idx.
  // If such an index doesn't exist, don't move forward in target, and increment ans by one.
  // Otherwise if such an index exists, set idx to that index.

// n = target.length, m = source.length
// Time Complexity: O(n log(m)) 84ms
// Space Complexity: O(m) 41.1MB
var shortestWay = function(source, target) {
  let idx = -1, map = {}, ans = 1;
  for (var j = 0; j < source.length; j++) {
    let char = source[j];
    if (!map[char]) map[char] = [];
    map[char].push(j);
  }
  let i = 0;
  while (i < target.length) {
    let char = target[i];
    if (!map[char]) return -1;
    // look for the first index greater than idx (idx + 1)
    idx = search(idx + 1, map[char]);
    if (idx === -1) {
      ans++;
    } else {
      i++;
    }
  }
  return ans;

  function search(idx, arr) {
    let left = 0, right = arr.length - 1;
    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (arr[mid] >= idx) right = mid;
      else left = mid + 1;
    }
    if (arr[left] < idx) return -1;
    return arr[left];
  }
};

// Three test cases to run function on
console.log(shortestWay("abc", "abcbc")) // 2
console.log(shortestWay("abc", "acdbc")) // -1
console.log(shortestWay("xyz", "xzyxz")) // 3