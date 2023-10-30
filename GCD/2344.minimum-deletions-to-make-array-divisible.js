// 2344. Minimum Deletions to Make Array Divisible
// You are given two positive integer arrays nums and numsDivide. You can delete any number of elements from nums.
// Return the minimum number of deletions such that the smallest element in nums divides all the elements of numsDivide. If this is not possible, return -1.
// Note that an integer x divides y if y % x == 0.


// Solution: GCD of numsDivide

// Find the minimum number where the GCD of numsDivide is divisible by (gcd % num === 0)

// Time Complexity: O(n log(n) + m log(m)) 175ms
  // n log(n) = time for sorting nums
  // m log(m) = time for finding GCD of numsDivide
// Space Complexity: O(log(n)) (space for sorting) 55.2MB
var minOperations = function(nums, numsDivide) {
  nums.sort((a, b) => a - b);
  let gcd = numsDivide[0];
  for (let i = 1; i < numsDivide.length; i++) {
    gcd = getGCD(gcd, numsDivide[i]);
  }
  for (let i = 0; i < nums.length; i++) {
    if (gcd % nums[i] === 0) return i;
  }
  return -1;
};

function getGCD(a, b) {
  if (b === 0) return a;
  return getGCD(b, a % b);
}

// Two test cases
console.log(minOperations([2,3,2,4,3], [9,6,9,3,15])) // 2
console.log(minOperations([4,3,6], [8,2,6,10])) // -1