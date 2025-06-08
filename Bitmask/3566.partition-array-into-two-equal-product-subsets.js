// 3566. Partition Array into Two Equal Product Subsets
// You are given an integer array nums containing distinct positive integers and an integer target.
// Determine if you can partition nums into two non-empty disjoint subsets, with each element belonging to exactly one subset, such that the product of the elements in each subset is equal to target.
// Return true if such a partition exists and false otherwise.
// A subset of an array is a selection of elements of the array.


// Solution: Enumerate Bitmasks

// n is small enough to enumerate every bitmask.
// For every bitmask, get the product of bits taken, and bits not taken.
// If the two products are both equal and both equal to target, a valid partition exists.

// n = length of nums
// Time Complexity: O(2^n * n) 12ms
// Space Complexity: O(1) 57MB
function checkEqualPartitions(nums, target) {
  const n = nums.length, fullMask = 1 << n;
  for (let mask = 1; mask < fullMask - 1; mask++) {
    let productTaken = 1, productSkipped = 1;
    for (let i = 0; i < n; i++) {
      if ((mask >> i) & 1) {
        productTaken *= nums[i];
      } else {
        productSkipped *= nums[i];
      }
    }
    if (productTaken === target && productSkipped === target) {
      return true;
    }
  }
  return false;
};

// Two test cases
console.log(checkEqualPartitions([3,1,6,8,4], 24)) // true
console.log(checkEqualPartitions([2,5,3,7], 15)) // false