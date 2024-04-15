// 3117. Minimum Sum of Values by Dividing Array
// You are given two arrays nums and andValues of length n and m respectively.
// The value of an array is equal to the last element of that array.
// You have to divide nums into m disjoint contiguous subarrays such that for the ith subarray [li, ri], the bitwise AND of the subarray elements is equal to andValues[i], in other words, nums[li] & nums[li + 1] & ... & nums[ri] == andValues[i] for all 1 <= i <= m, where & represents the bitwise AND operator.
// Return the minimum possible sum of the values of the m subarrays nums is divided into. If it is not possible to divide nums into m subarrays satisfying these conditions, return -1.


// Solution: DP

// Memoize each dp(i, j, mask), where
  // i = index in nums
  // j = index in andValues
  // mask = bitmask for the current subarray
// For each dp(i, j, mask), we either take nums[i] to be part of the same subarray, or to start a new subarray.

// Why mask has at most 17 different states:
  // The mask will have at most 17 values, which is the maximum number of bits in the maximum value of andValues.
  // When we create a new subarray, mask will be initialized with nums[i].
  // From there onwards, we will only lose bits or stay the same.
  // If we lose 1 bit for each element we take, it will have 17 different states.
  // This is because the sequence of numbers we take will not change. We can't skip elements because it's a subarray, not a subsequence.

// n = length of nums, m = length of andValues
// Time Complexity: O(nm * bits(max(andValues[i]))) 1246ms
// Space Complexity: O(nm * bits(max(andValues[i]))) 105.6MB
var minimumValueSum = function(nums, andValues) {
  let n = nums.length, m = andValues.length;
  let memo = new Map();
  let ans = dp(0, 0, -1);
  return ans === Infinity ? -1 : ans;
  
  function dp(i, j, mask) {
    if (i === n) return j === m ? 0 : Infinity;
    if (j === m) return Infinity;
    
    mask = mask === -1 ? nums[i] : mask & nums[i];
    if ((mask & andValues[j]) !== andValues[j]) return Infinity;

    let key = `${i},${j},${mask}`;
    if (memo.has(key)) return memo.get(key);

    let extendExisting = dp(i + 1, j, mask);
    let startNew = mask === andValues[j] ? nums[i] + dp(i + 1, j + 1, -1) : Infinity;
    let minSum = Math.min(extendExisting, startNew);
    memo.set(key, minSum);
    return minSum;
  }
};

// Three test cases
console.log(minimumValueSum([1,4,3,3,2], [0,3,3,2])) // 12
console.log(minimumValueSum([2,3,5,7,7,7,5], [0,7,5])) // 17
console.log(minimumValueSum([1,2,3,4], [2])) // -1