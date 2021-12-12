// 907. Sum of Subarray Minimums
// Given an array of integers arr, find the sum of min(b), where b ranges over every (contiguous) subarray of arr. Since the answer may be large, return the answer modulo 109 + 7.


// Solution: Monotonic Increasing Stack

// For each number, find the previous smallest number and the next smallest number.
// e.g: [2,5,3,8,1] for the number 3,
//         |     |
//        Prev  Next
// 2 is the previous number smaller than 3, and 1 is the next number smaller than 3.
// The distance from 3 to 2 is 2, and the distance from 3 to 1 is 2.
// We can get the number of subarrays which contain 3 by this formula: dist to prev smallest * dist to next smallest
// Proof: [5,1,3,8,2] 2 * 2 = 4 subarrays.
// start with 3: [3],[3,8]
// start with 5: [5,3],[5,3,8]

// 1. Keep a monotonic increasing stack initialized with [-1].
// 2. Loop forwards in arr and populate the left array.
// 3. Loop backwards in arr and populate the right array.
// 4. Compute the answer: arr[i] * left[i] * right[i]: (number * number of subarrays it is in)

// Time Complexity: O(n) 104ms
// Space Complexity: O(n) 47.9MB
var sumSubarrayMins = function(arr) {
  let stack = [-1], n = arr.length;
  let mod = 10 ** 9 + 7;
  let left = Array(n), right = Array(n);
  for (var i = 0; i < n; i++) {
    while (stack[stack.length - 1] !== -1 && arr[stack[stack.length - 1]] >= arr[i]) {
      stack.pop();
    }
    left[i] = i - stack[stack.length - 1];
    stack.push(i);
  }
  stack = [n];
  let ans = 0;
  for (i = n - 1; i >= 0; i--) {
    while (stack[stack.length - 1] !== n && arr[stack[stack.length - 1]] > arr[i]) {
      stack.pop();
    }
    right[i] = stack[stack.length - 1] - i;
    ans += arr[i] * left[i] * right[i];
    stack.push(i);
  }
  return ans % mod;
};

// Three test cases to run function on
console.log(sumSubarrayMins([71,55,82,55])) // 593
console.log(sumSubarrayMins([3,1,2,4])) // 17
console.log(sumSubarrayMins([11,81,94,43,3])) // 444