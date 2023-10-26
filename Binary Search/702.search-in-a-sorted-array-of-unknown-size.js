// 702. Search in a Sorted Array of Unknown Size
// This is an interactive problem.
// You have a sorted array of unique elements and an unknown size. You do not have an access to the array but you can use the ArrayReader interface to access it. You can call ArrayReader.get(i) that:
  // returns the value at the ith index (0-indexed) of the secret array (i.e., secret[i]), or
  // returns 2^31 - 1 if the i is out of the boundary of the array.
// You are also given an integer target.
// Return the index k of the hidden array where secret[k] == target or return -1 otherwise.
// You must write an algorithm with O(log n) runtime complexity.


// Solution: Find Upper Bound & Binary Search

// Find the upper bound in O(log(n)) time: Start the high pointer at the beginning and multiply it by 2 until reader.get(high) becomes bigger than or equal to the target.
// Then, use binary search to find the index.

// Time Complexity: O(log(n)) 100ms
// Space Complexity: O(1) 44.8MB
var search = function (reader, target) {
  let low = 0, high = 1;
  while (reader.get(high) < target) high = high * 2;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    let num = reader.get(mid);
    if (num === target) return mid;
    else if (num < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
};