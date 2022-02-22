// 1064. Fixed Point
// Given an array of distinct integers arr, where arr is sorted in ascending order, return the smallest index i that satisfies arr[i] == i. If there is no such index, return -1.


// Solution: Binary Search

// We know that if arr[i] is smaller than i, it's impossible to find a fixed point to the left of i, since arr is always sorted.

// Time Complexity: O(log(n)) 80ms
// Space Complexity: O(1) 42.1MB
var fixedPoint = function(arr) {
  let low = 0, high = arr.length - 1;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] < mid) low = mid + 1;
    else high = mid;
  }
  return arr[low] === low ? low : -1;
};

// Three test cases to run function on
console.log(fixedPoint([-10,-5,0,3,7])) // 3
console.log(fixedPoint([0,2,5,8,17])) // 0
console.log(fixedPoint([-10,-5,3,4,7,9])) // -1