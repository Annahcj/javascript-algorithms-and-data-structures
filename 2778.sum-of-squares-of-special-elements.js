// 2778. Sum of Squares of Special Elements
// You are given a 1-indexed integer array nums of length n.
// An element nums[i] of nums is called special if i divides n, i.e. n % i == 0.
// Return the sum of the squares of all special elements of nums.


// Solution: Iteration

// Go through each index i where i * i <= n, and get the squares of nums[i - 1] and nums[(n / i) - 1].

// Time Complexity: O(sqrt(n)) 67ms
// Space Complexity: O(1) 44.5MB
var sumOfSquares = function(nums) {
  let n = nums.length, ans = 0;
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      ans += (nums[i - 1] * nums[i - 1]);
      let complement = n / i;
      if (complement !== i) ans += nums[complement - 1] * nums[complement - 1];
    }
  }
  return ans;
};

// Two test cases
console.log(sumOfSquares([1,2,3,4])) // 21
console.log(sumOfSquares([2,7,1,19,18,3])) // 63