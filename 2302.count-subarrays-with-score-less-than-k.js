// 2302. Count Subarrays With Score Less Than K
// The score of an array is defined as the product of its sum and its length.
  // For example, the score of [1, 2, 3, 4, 5] is (1 + 2 + 3 + 4 + 5) * 5 = 75.
// Given a positive integer array nums and an integer k, return the number of non-empty subarrays of nums whose score is strictly less than k.
// A subarray is a contiguous sequence of elements within an array.


// Solution: Sliding Window

// Maintain a sliding window ending at each index j.
// When the sum of the elements in the window * the window size is bigger than or equal to k, move up the left pointer.
// Add j - i + 1 to the answer: this represents each subarray ending at index j.

// Time Complexity: O(n) 114ms
// Space Complexity: O(1) 52.3MB
var countSubarrays = function(nums, k) {
  let ans = 0, sum = 0;
  for (let j = 0, i = 0; j < nums.length; j++) {
    sum += nums[j];
    while (sum * (j - i + 1) >= k) sum -= nums[i++];
    ans += j - i + 1;
  }
  return ans;
};

// Two test cases to run function on
console.log(countSubarrays([2,1,4,3,5], 10)) // 6
console.log(countSubarrays([1,1,1], 5)) // 5