// 795. Number of Subarrays with Bounded Maximum
// Given an integer array nums and two integers left and right, return the number of contiguous non-empty subarrays such that the value of the maximum array element in that subarray is in the range [left, right].
// The test cases are generated so that the answer will fit in a 32-bit integer.


// Solution: Counting

// 1. Count the number of subarrays which contain numbers smaller than right
// 2. Count the number of subarrays which contain numbers smaller than left - 1

// The result is count(right) - count(left - 1)

// e.g: [1,2,3], left = 3, right = 3
// count(2) = 3 -> [[1],[1,2],[2]]
// count(3) = 6 -> [[1],[1,2],[2],[1,2,3],[2,3],[3]]
// count(3) - count(2) = 6 - 3 = 3
// removing [[1],[1,2],[2]].

// Time Complexity: O(n) 64ms
// Space Complexity: O(1) 47.6MB
var numSubarrayBoundedMax = function(nums, left, right) {
  return count(right) - count(left - 1);
  
  function count(max) {
    let ans = 0, count = 0;
    for (let num of nums) {
      if (num > max) count = 0; // found a number out of range, reset count
      else count++; // within range, increase count
      ans += count; // count is the number of subarrays ending at the current number
    }
    return ans;
  }
};

// Two test cases to run function on
console.log(numSubarrayBoundedMax([2,1,4,3], 2, 3)) // 3
console.log(numSubarrayBoundedMax([2,9,2,5,6], 2, 8)) // 7