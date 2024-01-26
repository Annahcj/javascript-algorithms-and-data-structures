// 3011. Find if Array Can Be Sorted
// You are given a 0-indexed array of positive integers nums.
// In one operation, you can swap any two adjacent elements if they have the same number of set bits. You are allowed to do this operation any number of times (including zero).
// Return true if you can sort the array, else return false.


// Solution: Compare Consecutive Sequences

// Keep track of the current consecutive sequence with the same bit count.
// For each consecutive sequence, every number must be larger than or equal to the previous sequence's maximum number.

// n = length of nums
// Time Complexity: O(n log(n)) 64ms
// Space Complexity: O(1) 52.9MB
var canSortArray = function(nums) {
  let n = nums.length, prevMax = 0, currMax = nums[0];
  for (let i = 1; i < n; i++) {
    if (countOneBits(nums[i]) !== countOneBits(nums[i - 1])) {
      prevMax = currMax;
      currMax = nums[i];
    } else {
      currMax = Math.max(currMax, nums[i]);
    }
    if (nums[i] < prevMax) return false;
  }  
  return true;
};

function countOneBits(num) {
  let oneBits = 0;
  while (num > 0) {
    oneBits += (num & 1);
    num >>= 1;
  }
  return oneBits;
}

// Three test cases
console.log(canSortArray([8,4,2,30,15])) // true
console.log(canSortArray([1,2,3,4,5])) // true
console.log(canSortArray([3,16,8,4,2])) // false