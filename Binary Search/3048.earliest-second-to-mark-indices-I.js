// 3048. Earliest Second to Mark Indices I
// You are given two 1-indexed integer arrays, nums and, changeIndices, having lengths n and m, respectively.
// Initially, all indices in nums are unmarked. Your task is to mark all indices in nums.
// In each second, s, in order from 1 to m (inclusive), you can perform one of the following operations:
  // Choose an index i in the range [1, n] and decrement nums[i] by 1.
  // If nums[changeIndices[s]] is equal to 0, mark the index changeIndices[s].
  // Do nothing.
// Return an integer denoting the earliest second in the range [1, m] when all indices in nums can be marked by choosing operations optimally, or -1 if it is impossible.


// Solution: Binary Search

// Binary search for the earliest second s.
// To check if it's possible to mark all indices in s seconds,
  // The idea is to delay the "marking" of numbers as much as possible.
  // The latest point we can mark an index is the last occurance of it in changeIndices (only consider the prefix of changeIndices up to index s).
  // Before the latest point, store up as many decrement operations as possible.
  // When the time comes to mark an index, check whether we have enough decrement operations to use on nums[changeIndices[i]].
  // If the decrement operations are not enough, it's not possible - return false.
  // If they are enough, subtract nums[changeIndices[i]] from operations.

// n = length of nums, m = length of changeIndices
// Time Complexity: O((n + m) * log(m)) 70ms
// Space Complexity: O(n + m) 51.5MB
var earliestSecondToMarkIndices = function(nums, changeIndices) {
  changeIndices = changeIndices.map((index) => index - 1);
  let n = nums.length;
  let low = 0, high = changeIndices.length - 1;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (isPossible(mid)) high = mid;
    else low = mid + 1;
  }
  return isPossible(low) ? low + 1 : -1;
  
  function isPossible(s) {
    let last = Array(n).fill(-1);
    for (let i = 0; i <= s; i++) {
      last[changeIndices[i]] = i;
    }
    let marked = 0, operations = 0;
    for (let i = 0; i <= s; i++) {
      if (i === last[changeIndices[i]]) {
        if (nums[changeIndices[i]] > operations) return false;
        operations -= nums[changeIndices[i]];
        marked++;
      } else {
        operations++;
      }
    }
    return marked === n;
  }
};

// Three test cases
console.log(earliestSecondToMarkIndices([2,2,0], [2,2,2,2,3,2,2,1])) // 8
console.log(earliestSecondToMarkIndices([1,3], [1,1,1,2,1,1,1])) // 6
console.log(earliestSecondToMarkIndices([0,1], [2,2,2])) // -1