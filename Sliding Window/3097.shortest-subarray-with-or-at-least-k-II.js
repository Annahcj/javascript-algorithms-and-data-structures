// 3097. Shortest Subarray With OR at Least K II
// You are given an array nums of non-negative integers and an integer k.
// An array is called special if the bitwise OR of all of its elements is at least k.
// Return the length of the shortest special non-empty subarray of nums, or return -1 if no special subarray exists.


// Solution: Sliding Window

// Maintain a minimum-lengthed sliding window where the total bitwise OR >= k.
// Keep a count of occurances of each bit within the window.
// We need the count for each bit because we don't know whether to remove a bit when a number is removed from the window.
// Record the smallest length of the sliding window.

// Time Complexity: O(n log(n)) 59ms
// Space Complexity: O(1) 61.5MB
function minimumSubarrayLength(nums, k) {
  if (k === 0) return 1;
  let n = nums.length, count = Array(30).fill(0);
  let totalOR = 0, minLen = Infinity;
  for (let j = 0, i = 0; j < n; j++) {
    for (let pos = 0; pos < 30; pos++) {
      if ((nums[j] >> pos) & 1) {
        count[pos]++;
        if (count[pos] === 1) {
          totalOR |= (1 << pos);
        }
      }
    }
    while (totalOR >= k && i <= j) {
      minLen = Math.min(minLen, j - i + 1);
      for (let pos = 0; pos < 30; pos++) {
        if ((nums[i] >> pos) & 1) {
          count[pos]--;
          if (count[pos] === 0) {
            totalOR = totalOR ^ (1 << pos);
          }
        }
      }
      i++;
    }
  }
  return minLen === Infinity ? -1 : minLen;
};

// Three test cases
console.log(minimumSubarrayLength([1,2,3], 2)) // 1
console.log(minimumSubarrayLength([2,1,8], 10)) // 3
console.log(minimumSubarrayLength([1,2], 0)) // 1