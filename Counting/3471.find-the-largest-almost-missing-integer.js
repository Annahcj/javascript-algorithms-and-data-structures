// 3471. Find the Largest Almost Missing Integer
// You are given an integer array nums and an integer k.
// An integer x is almost missing from nums if x appears in exactly one subarray of size k within nums.
// Return the largest almost missing integer from nums. If no such integer exists, return -1.
// A subarray is a contiguous sequence of elements within an array.
 

// Solution: Greedy w/ Counting

// If k is equal to n, return the maximum number in nums.
// If k is 1, return the maximum unique number.
// Otherwise,
  // The only possible candidates are the first and last numbers, because all the rest are guaranteed to be included in more than one subarray.
  // Out of the first and last numbers, check if they are unique within nums and return the larger one. 

// n = length of nums, m = max(nums[i])
// Time Complexity: O(n + m) 4ms
// Space Complexity: O(m) 55.72MB
function largestInteger(nums, k) {
  const count = Array(51).fill(0);
  let max = 0;
  for (let num of nums) {
    count[num]++;
    max = Math.max(max, num);
  }
  if (k === nums.length) {
    return max;
  }
  if (k === 1) {
    for (let num = 50; num >= 0; num--) {
      if (count[num] === 1) return num;
    }
  }
  const candidates = [nums[0], nums[nums.length - 1]].sort((a, b) => b - a);
  for (let num of candidates) {
    if (count[num] === 1) return num;
  }
  return -1;
};

// Two test cases
console.log(largestInteger([3,9,2,1,7], 3)) // 7
console.log(largestInteger([3,9,7,2,1,7], 4)) // 3