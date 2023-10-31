// 2772. Apply Operations to Make All Array Elements Equal to Zero
// You are given a 0-indexed integer array nums and a positive integer k.
// You can apply the following operation on the array any number of times:
  // Choose any subarray of size k from the array and decrease all its elements by 1.
// Return true if you can make all the array elements equal to 0, or false otherwise.
// A subarray is a contiguous non-empty part of an array.


// Solution: Sweep Line 

// Keep track of the number of operations for subarrays starting at each index i. 
// operations[i] = amount to decrease for subarray of size k starting at nums[i].
// For each subarray operation that we start, 
  // operations[i] -= num
  // operations[i + k] += num
// By keeping the running sum of each operations[i], we will get the total amount to decrease each nums[i].

// If nums[i] + current operations < 0, then it is impossible.

// Time Complexity: O(n) 113ms
// Space Complexity: O(n) 54.9MB
var checkArray = function(nums, k) {
  let n = nums.length, operations = Array(n + 1).fill(0), currOperations = 0;
  for (let i = 0; i < n; i++) {
    currOperations += operations[i];
    let num = nums[i] + currOperations;
    if (num < 0) return false;
    if (num > 0) {
      operations[i] -= num;
      if (i + k > n) return false;
      operations[i + k] += num;
      currOperations -= num;
    }
  }
  return true;
};

// Two test cases
console.log(checkArray([2,2,3,1,1,0], 3)) // true
console.log(checkArray([1,3,1,1], 2)) // false