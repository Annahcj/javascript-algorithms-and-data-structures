// 1846. Maximum Element After Decreasing and Rearranging
// You are given an array of positive integers arr. Perform some operations (possibly none) on arr so that it satisfies these conditions:
  // The value of the first element in arr must be 1.
  // The absolute difference between any 2 adjacent elements must be less than or equal to 1. In other words, abs(arr[i] - arr[i - 1]) <= 1 for each i where 1 <= i < arr.length (0-indexed). abs(x) is the absolute value of x.
// There are 2 types of operations that you can perform any number of times:
  // Decrease the value of any element of arr to a smaller positive integer.
  // Rearrange the elements of arr to be in any order.
// Return the maximum possible value of an element in arr after performing the operations to satisfy the conditions.


// Solution: Greedy w/ Sorting

// Sort the array in asc order.
// For each arr[i],
  // If arr[i] is equal to arr[i - 1], we have to leave it as is.
  // Otherwise, decrease arr[i] to arr[i - 1].

// Time Complexity: O(n log(n)) 80ms
// Space Complexity: O(log(n)) (space for sorting) 51.7MB
var maximumElementAfterDecrementingAndRearranging = function(arr) {
  arr.sort((a, b) => a - b);
  let n = arr.length;
  arr[0] = 1;
  for (let i = 1; i < n; i++) {
    arr[i] = Math.min(arr[i], arr[i - 1] + 1);
  }
  return arr[n - 1];
};

// Two test cases
console.log(maximumElementAfterDecrementingAndRearranging([2,2,1,2,1])) // 2
console.log(maximumElementAfterDecrementingAndRearranging([100,1,1000])) // 3