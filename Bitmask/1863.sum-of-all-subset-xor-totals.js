// 1863. Sum of All Subset XOR Totals
// The XOR total of an array is defined as the bitwise XOR of all its elements, or 0 if the array is empty.
  // For example, the XOR total of the array [2,5,6] is 2 XOR 5 XOR 6 = 1.
// Given an array nums, return the sum of all XOR totals for every subset of nums. 
// Note: Subsets with the same elements should be counted multiple times.
// An array a is a subset of an array b if a can be obtained from b by deleting some (possibly zero) elements of b.


// Solution: Enumeration w/ Bitmasks

// Enumerate every subset using bitmasks.
// For each bitmask, go through nums and get the xor value for the subset.
// Return the total sum of xor values.

// Time Complexity: O(2^n * n) 65ms
// Space Complexity: O(1) 48.4MB
var subsetXORSum = function(nums) {
  let n = nums.length, xorSum = 0;
  for (let mask = 1; mask < (1 << n); mask++) {
    let xor = 0;
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) {
        xor ^= nums[i];
      }
    }
    xorSum += xor;
  }
  return xorSum;
};

// Three test cases
console.log(subsetXORSum([1,3])) // 6
console.log(subsetXORSum([5,1,6])) // 28
console.log(subsetXORSum([3,4,5,6,7,8])) // 480