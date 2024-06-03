// 3171. Find Subarray With Bitwise AND Closest to K
// You are given an array nums and an integer k. You need to find a subarray of nums such that the absolute difference between k and the bitwise AND of the subarray elements is as small as possible. In other words, select a subarray nums[l..r] such that |k - (nums[l] AND nums[l + 1] ... AND nums[r])| is minimum.
// Return the minimum possible value of the absolute difference.
// A subarray is a contiguous non-empty sequence of elements within an array.


// Solution 1: DP - Recursion w/ Memoization

// Memoize each dp(i, andVal), where
  // i = current index in nums
  // andVal = bitwise AND for the current subarray

// For each dp(i, andVal), we either take nums[i] as part of the current subarray or start a new subarray.
// Pruning: If andVal is smaller than k, there is no point expanding the subarray any further because andVal will only become smaller and therefore further away from k.

// Why it's fast enough: 
  // For every index i, andVal can only have 30 possible states.
  // This is due to the property of bitwise AND - the value will only unset remaining bits, it will never set new bits.
  // Think about it as a reversed prefix array, each subarray ends at index i - 1 and the start indices are from i - 1 to 0. There are only 30 possible values out of these subarrays, not i - 1 different values.

// Time Complexity: O(30n) 2994ms
// Space Complexity: O(30n) 146.7MB
var minimumDifference = function(nums, k) {
  let n = nums.length, memo = new Map();
  return dp(1, nums[0]);
  
  function dp(i, andVal) {
    if (i === n) return Math.abs(andVal - k);
    let key = `${i},${andVal}`;
    if (memo.has(key)) return memo.get(key);
    
    let minDiff = Math.min(Math.abs(andVal - k), dp(i + 1, nums[i]));
    if (andVal > k) {
      minDiff = Math.min(minDiff, dp(i + 1, andVal & nums[i]));
    }
    memo.set(key, minDiff);
    return minDiff;
  }
};


// Solution 2: DP - Space Optimized

// Notice that we only need to keep track of the results from the previous index.
// At each index, there can be at most 30 different states of the bitwise AND values:
// (think of the subarrays all ending at index i - 1, in the worst case if only one bit is unset at a time, it will have 30 different states because it's a subarray not a subsequence).

// Time Complexity: O(30n) 156ms
// Space Complexity: O(30) = O(1) 66.8MB
var minimumDifference = function(nums, k) {
  let n = nums.length, prev = new Set([nums[0]]);
  let minDiff = Math.abs(nums[0] - k);
  for (let i = 1; i < n; i++) {
    let curr = new Set([nums[i]]); // start new subarray
    minDiff = Math.min(minDiff, Math.abs(nums[i] - k));
    for (let val of prev) {
      let newVal = val & nums[i];
      minDiff = Math.min(minDiff, Math.abs(newVal - k));
      if (newVal > k) { // pruning 
        curr.add(newVal);
      }
    }
    prev = curr;
  }
  return minDiff;
};

// Three test cases
console.log(minimumDifference([1,2,4,5], 3)) // 1
console.log(minimumDifference([1,2,1,2], 2)) // 0
console.log(minimumDifference([1], 10)) // 9