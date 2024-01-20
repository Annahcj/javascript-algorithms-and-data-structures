// 907. Sum of Subarray Minimums
// Given an array of integers arr, find the sum of min(b), where b ranges over every (contiguous) subarray of arr. Since the answer may be large, return the answer modulo 109 + 7.


// Solution: Monotonic Increasing Stack

// For each number, find the previous smallest number and the next smallest number.
// e.g: [2,5,3,8,1] for the number 3,
//       |       |
//      Prev    Next
// 2 is the previous number smaller than 3, and 1 is the next number smaller than 3.
// The distance from 3 to 2 is 2, and the distance from 3 to 1 is 2.
// We can get the number of subarrays which contain 3 by this formula: dist to prev smallest * dist to next smallest
// Proof: [2,5,_3_,8,1] -> 2 * 2 = 4 subarrays.
// start with 3: [3],[3,8]
// start with 5: [5,3],[5,3,8]

// 1. Iterate from right to left and find the first number smaller than arr[i] on the right side.
// 2. Iterate from left to right and find the first number smaller than or equal to arr[i] on the left side.
  // Based on the indices of the left and right smaller numbers, we can find the numbers of subarrays based on the distance.
  // Add arr[i] * subarrays to the total.

// Time Complexity: O(n) 90ms
// Space Complexity: O(n) 58.4MB
var sumSubarrayMins = function(arr) {
  let n = arr.length, stack = [];
  let smallerRight = Array(n).fill(n);
  for (let i = n - 1; i >= 0; i--) {
    while (stack.length && arr[stack[stack.length - 1]] >= arr[i]) stack.pop();
    if (stack.length) {
      smallerRight[i] = stack[stack.length - 1];
    }
    stack.push(i);
  }
  stack = [];
  let ans = 0, MOD = 1000000007;
  for (let i = 0; i < n; i++) {
    while (stack.length && arr[stack[stack.length - 1]] > arr[i]) stack.pop();
    let smallerLeft = stack.length ? stack[stack.length - 1] : -1;
    let lengthRight = smallerRight[i] - i;
    let lengthLeft = i - smallerLeft;
    let subarrays = lengthRight * lengthLeft;
    ans = (ans + arr[i] * subarrays) % MOD;
    stack.push(i);
  }
  return ans;
};

// Three test cases 
console.log(sumSubarrayMins([71,55,82,55])) // 593
console.log(sumSubarrayMins([3,1,2,4])) // 17
console.log(sumSubarrayMins([11,81,94,43,3])) // 444