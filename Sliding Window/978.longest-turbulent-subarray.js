// 978. Longest Turbulent Subarray
// Given an integer array arr, return the length of a maximum size turbulent subarray of arr.
// A subarray is turbulent if the comparison sign flips between each adjacent pair of elements in the subarray.


// Solution: Sliding Window w/ Two Counters

// Keep two variables to check the two different situations ->
  // 1. numbers at even indexes are either
    // 1 (even). bigger than the prev number
    // 2 (odd). smaller than the prev number
  // 2. numbers at odd indexes are either
    // 1 (even). smaller than the prev number
    // 2 (odd). bigger than the prev number
  // compare with global max variable -> max of max, even, odd
// Return max

// Time Complexity: O(n) 139ms
// Space Complexity: O(1) 44.4MB
var maxTurbulenceSize = function(arr) {
  let max = 1;
  let even = 1, odd = 1;
  for (let i = 1; i < arr.length; i++) {
    if (i % 2 === 0) {
      even = arr[i - 1] < arr[i] ? even + 1 : 1;
      odd = arr[i - 1] > arr[i] ? odd + 1 : 1;
    } else {
      even = arr[i - 1] > arr[i] ? even + 1 : 1;
      odd = arr[i - 1] < arr[i] ? odd + 1 : 1;
    }
    max = Math.max(max, even, odd);
  }
  return max;
};

// Three test cases 
console.log(maxTurbulenceSize([9,4,2,10,7,8,8,1,9])) // 5
console.log(maxTurbulenceSize([4,8,12,16])) // 2
console.log(maxTurbulenceSize([100])) // 1