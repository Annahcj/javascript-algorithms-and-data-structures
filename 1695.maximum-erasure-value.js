// 1695. Maximum Erasure Value
// You are given an array of positive integers nums and want to erase a subarray containing unique elements. The score you get by erasing the subarray is equal to the sum of its elements.
// Return the maximum score you can get by erasing exactly one subarray.
// An array b is called to be a subarray of a if it forms a contiguous subsequence of a, that is, if it is equal to a[l],a[l+1],...,a[r] for some (l,r).


// Solution: Sliding Window 

// The question is: Get the maximum sum of a subarray of unique elements.
// Maintain a sliding window of unique elements.
// Since 1 <= nums[i] <= 10^4, we can use an array of size (max number in nums + 1) to keep track of numbers in our window.
// If a number already exists in the window, move the left pointer up until we pass that number.

// Time Complexity: O(n) 159ms
// Space Complexity: O(max(nums)) 53.8MB
var maximumUniqueSubarray = function(nums) {
  let max = Math.max(...nums), seen = Array(max + 1).fill(0);
  let sum = 0, ans = 0;
  for (let j = 0, i = 0; j < nums.length; j++) {
    while (seen[nums[j]]) {
      seen[nums[i]] = 0;
      sum -= nums[i++];
    }
    seen[nums[j]] = 1;
    sum += nums[j];
    ans = Math.max(ans, sum);
  }
  return ans;
};

// Two test cases to run function on
console.log(maximumUniqueSubarray([4,2,4,5,6])) // 17
console.log(maximumUniqueSubarray([5,2,1,2,5,2,1,2,5])) // 8