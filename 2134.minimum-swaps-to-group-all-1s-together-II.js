// 2134. Minimum Swaps to Group All 1's Together II
// A swap is defined as taking two distinct positions in an array and swapping the values in them.
// A circular array is defined as an array where we consider the first element and the last element to be adjacent.
// Given a binary circular array nums, return the minimum number of swaps required to group all 1's present in the array together at any location.


// Solution: Sliding Window

// 1. Find the window size: The total number of ones in nums.
// 2. Find out the number of ones in each window of size (onesCount).
  // The answer is onesCount - the window with the most amount of zeroes in it.

// Time Complexity: O(n) 96ms
// Space Complexity: O(1) 47.3MB
var minSwaps = function(nums) {
  let onesCount = 0, n = nums.length;
  for (var num of nums) onesCount += num;
  
  let ones = 0, ans = Infinity;
  for (var i = 0, j = 0; i < n; i++) {
    while (j - i < onesCount) {
      ones += nums[j % n];
      j++;
    }
    ans = Math.min(ans, onesCount - ones);
    ones -= nums[i];
  }
  return ans;
};

// Three test cases to run function on
console.log(minSwaps([0,1,0,1,1,0,0])) // 1
console.log(minSwaps([0,1,1,1,0,0,1,1,0])) // 2
console.log(minSwaps([1,1,0,0,1])) // 0