// 2968. Apply Operations to Maximize Frequency Score
// You are given a 0-indexed integer array nums and an integer k.
// You can perform the following operation on the array at most k times:
  // Choose any index i from the array and increase or decrease nums[i] by 1.
// The score of the final array is the frequency of the most frequent element in the array.
// Return the maximum score you can achieve.
// The frequency of an element is the number of occurences of that element in the array.


// Solution: Binary Search & Prefix Sum

// First of all, sort nums in asc order.
// Binary search for the maximum frequency (in other words, the window length) we can achieve within k moves.
// For a length `len`, maintain a window of size len, and check whether it's possible to turn all elements in the window into the median of the window with at most k moves.
  // The median of the window is always the best option to choose to minimize the operations.
  // If the window size is even, the minimum operations out of the two medians will be exactly the same, so we can pick either one.
  // Use prefix sum to find the number of operations needed within a range.
  // Cost to turn range (left, right) into nums[medianIndex]: 
    // Left side: (count of the left side * nums[medianIndex]) - sum(nums[left], ..., nums[medianIndex - 1])
    // Right side: sum(nums[medianIndex + 1], ..., nums[right]) - (count of the right side * nums[medianIndex])

// Time Complexity: O(n log(n)) 765ms
// Space Complexity: O(n) 74.3MB
var maxFrequencyScore = function(nums, k) {
  nums.sort((a, b) => a - b);
  let n = nums.length, prefixSum = [...nums];
  for (let i = 1; i < n; i++) {
    prefixSum[i] += prefixSum[i - 1];
  }
  let low = 0, high = n;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (isPossible(nums, prefixSum, mid, k)) low = mid;
    else high = mid - 1;
  }
  return low;
};

function getRangeSum(prefixSum, left, right) {
  if (left > right) return 0;
  if (left === 0) return prefixSum[right];
  return prefixSum[right] - prefixSum[left - 1];
}
  
function isPossible(nums, prefixSum, len, k) {
  let n = nums.length;
  for (let right = len - 1; right < n; right++) { 
    let left = right - len + 1;
    let medianIndex = Math.floor((left + right) / 2);
    let sumLeft = getRangeSum(prefixSum, left, medianIndex - 1);
    let sumRight = getRangeSum(prefixSum, medianIndex + 1, right);
    let costToChangeLeftToMedian = BigInt(nums[medianIndex] * (medianIndex - left)) - BigInt(sumLeft);
    let costToChangeRightToMedian = BigInt(sumRight) - BigInt(nums[medianIndex] * (right - medianIndex));
    if (costToChangeLeftToMedian + costToChangeRightToMedian <= k) return true;
  }
  return false;
}

// Two test cases
console.log(maxFrequencyScore([1,2,6,4], 3)) // 3
console.log(maxFrequencyScore([1,4,4,2,4], 0)) // 3