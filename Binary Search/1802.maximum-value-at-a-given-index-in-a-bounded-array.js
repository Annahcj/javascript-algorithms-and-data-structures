// 1802. Maximum Value at a Given Index in a Bounded Array
// You are given three positive integers: n, index, and maxSum. You want to construct an array nums (0-indexed) that satisfies the following conditions:
  // nums.length == n
  // nums[i] is a positive integer where 0 <= i < n.
  // abs(nums[i] - nums[i+1]) <= 1 where 0 <= i < n-1.
  // The sum of all the elements of nums does not exceed maxSum.
  // nums[index] is maximized.
// Return nums[index] of the constructed array.
// Note that abs(x) equals x if x >= 0, and -x otherwise.


// Solution: Binary Search 

// Binary search for the maximum value of nums[index] which satisfies all the conditions.
// For each value, first set nums[index] to the value and decrease incrementally on the left and right.
// If the maximum sum doesn't exceed maxSum, then we can return the value at nums[index].

// For both the left and right side, we need to calculate the decreasing sum.
  // Note: When value is too small to decrease for all remaining elements, we will need to use 1's as the minimum value instead. 
  // decreasingCount: amount of numbers in the decreasing sequence (e.g: value = 5, decreasing sequence = 5,4,3,2,1)
  // remainingCount: amount of numbers to default to 1 (e.g: index = 5, [1,1,1,2,3,4], the two 1's at the front have to default to 1 because all numbers must be positive)
  // decreasingSum: sum of the decreasing sequence (e.g: 5 + 4 + 3 + 2). This also takes into account when the sequence is too short to end at 1, so we need to subtract the extra count off.
  // total sum: decreasingSum + remainingCount 

// m = maxSum
// Time Complexity: O(log(m)) 76ms
// Space Complexity: O(1) 44.8MB
var maxValue = function(n, index, maxSum) {
  let low = 1, high = maxSum;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (BigInt(mid) + getSum(index, Math.max(1, mid - 1)) + getSum(n - index - 1, Math.max(1, mid - 1)) <= maxSum) low = mid;
    else high = mid - 1;
  }
  return low;
};

function getSum(n, startVal) {
  const decreasingCount = Math.min(n, startVal); // amount of numbers in decreasing sequence
  const remainingCount = n - decreasingCount; // amount of numbers to default to 1
  const decreasingSum = getDecreasingCount(startVal) - getDecreasingCount(startVal - decreasingCount); // sum of the decreasing sequence
  return decreasingSum + BigInt(remainingCount); // decreasing sum + remaining 1's
}

function getDecreasingCount(n) {
  let bigIntN = BigInt(n);
  return bigIntN * (bigIntN + 1n) / 2n;
}

// Two test cases
console.log(maxValue(4, 2, 6)) // 2
console.log(maxValue(6, 1, 10)) // 3