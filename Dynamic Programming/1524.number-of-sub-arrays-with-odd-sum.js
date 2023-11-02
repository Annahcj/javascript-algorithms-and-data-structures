// 1524. Number of Sub-arrays With Odd Sum
// Given an array of integers arr, return the number of subarrays with an odd sum.
// Since the answer can be very large, return it modulo 10^9 + 7.


// Solution: Dynamic Programming & Prefix Sum

// Things to keep track of on the fly:
  // 1. Running sum of arr
  // 2. The count of odd running sums
  // 3. The count of even running sums

// For each nums[i] in arr, count the number of odd sum subarrays ending at index i.
  // If the current running sum is
    // even: Then we have exactly 'odd sum count' number of subarrays ending at index i.
      // Add the number of odd sum subarrays to the answer.
    // odd: Then we have exactly 'even sum count' number of subarrays ending at index i.
      // Add the number of even sum subarrays to the answer.

// Time Complexity: O(n) 110ms
// Space Complexity: O(1) 52.4MB
var numOfSubarrays = function(arr) {
  let odd = 0, even = 1;
  let sum = 0, ans = 0, mod = 10 ** 9 + 7;
  for (let num of arr) {
    sum += num;
    if (sum % 2 === 0) {
      ans = (ans + odd) % mod;
      even++;
    } else {
      ans = (ans + even) % mod;
      odd++;
    }
  }
  return ans;
};

// Three test cases 
console.log(numOfSubarrays([1,3,5])) // 4
console.log(numOfSubarrays([2,4,6])) // 0
console.log(numOfSubarrays([1,2,3,4,5,6,7])) // 16