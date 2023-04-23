// 2654. Minimum Number of Operations to Make All Array Elements Equal to 1
// You are given a 0-indexed array nums consisiting of positive integers. You can do the following operation on the array any number of times:
  // Select an index i such that 0 <= i < n - 1 and replace either of nums[i] or nums[i+1] with their gcd value.
// Return the minimum number of operations to make all elements of nums equal to 1. If it is impossible, return -1.
// The gcd of two integers is the greatest common divisor of the two integers.


// Solution: Greedy

// If the array contains at least one 1, then all elements in the array can also become 1 by being paired with 1. 
// If nums contains at least one 1, the minimum number of operations is n - ones.

// If there is no 1, find the shortest subarray with a gcd value of 1 (gcd each adjacent pair of numbers to get the total gcd).
// From the subarray, after gcd-ing each adjacent pair of numbers, we will end up with the last element as 1. 
// From there, it will take n-1 operations to make all other numbers 1. 
// Total number of operations: (n - 1) + (subarray length - 1)

// Time Complexity: O(n^2) 77ms
// Space Complexity: O(1) 43.7MB
var minOperations = function(nums) {
  let n = nums.length, ones = 0;
  for (let i = 0; i < n; i++) {
    ones += nums[i] === 1 ? 1 : 0;
  }
  if (ones > 0) return n - ones;
  
  let minLen = Infinity;
  for (let i = 0; i < n; i++) {
    let currGCD = nums[i];
    for (let j = i + 1; j < n; j++) {
      currGCD = gcd(currGCD, nums[j]);
      if (currGCD === 1) minLen = Math.min(minLen, j - i + 1);
    }
  }
  if (minLen === Infinity) return -1; 
  return (n - 1) + (minLen - 1);
};

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

// Two test cases
console.log(minOperations([2,6,3,4])) // 4
console.log(minOperations([2,10,6,14])) // -1