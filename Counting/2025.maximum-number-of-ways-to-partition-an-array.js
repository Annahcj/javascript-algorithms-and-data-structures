// 2025. Maximum Number of Ways to Partition an Array
// You are given a 0-indexed integer array nums of length n. The number of ways to partition nums is the number of pivot indices that satisfy both conditions:
  // 1 <= pivot < n
  // nums[0] + nums[1] + ... + nums[pivot - 1] == nums[pivot] + nums[pivot + 1] + ... + nums[n - 1]
// You are also given an integer k. You can choose to change the value of one element of nums to k, or to leave the array unchanged.
// Return the maximum possible number of ways to partition nums to satisfy both conditions after changing at most one element.


// Solution: Frequency of Diffs

// e.g: [2,-1,2], k = 3

// diff[i] = left sum - right sum (including value at i)
// diff = [*, 1, -1]
// Use a hashmap to store the frequencies of each difference.

// There are two situations:
  // 1. Don't change any number -> The answer is the number of diff[i] which is 0
  // 2. Otherwise, try to change each nums[i] to k
    // Separate the diff frequencies as left and right (includes i) of the current number.
  

// diff = [*, 1, -1]

// change nums[0] to 3: 
  // kDiff = 2 - 3 = -1. 
  // Look for diffs that are -1 in the right: [*, 1, (-1)],
  // and -kDiff (1) in the left. 
  // There is one at diff[2].

// change nums[1] to 3: 
  // kDiff = 1 - 3 = -2. 
  // Look for diffs that are -2 in the right: [*, 1, -1],
  // and -kDiff (2) in the left
  // There are none.

// change nums[2] to 3: 
  // kDiff = -1 - 3 = -4.
  // Look for diffs that are -4 in the right: [*, 1, -1],
  // and -kDiff (4) in the left
  // There are none.

// The best case is to change nums[0] to k, which results in one pivot.
// Try to run through the code with this example and it may become clearer: [0,0,2,0,0], k = 0

// Time Complexity: O(n) 1278ms
// Space Complexity: O(n) 110.8MB
var waysToPartition = function(nums, k) {
  let n = nums.length, diff = Array(n), leftDiffFreq = {}, rightDiffFreq = {};
  let left = nums[0], right = nums.reduce((acc, num) => acc + num) - nums[0];
  for (let i = 1; i < n; i++) {
    diff[i] = left - right;
    rightDiffFreq[diff[i]] = (rightDiffFreq[diff[i]] || 0) + 1;
    left += nums[i];
    right -= nums[i];
  }

  let ans = rightDiffFreq[0] || 0;
  for (let i = 0; i < n; i++) {
    let kDiff = nums[i] - k; // count pivot indices after changing nums[i] to k
    ans = Math.max(ans, (rightDiffFreq[kDiff] || 0) + (leftDiffFreq[-kDiff] || 0)); // leftDiff[-kDiff] + rightDiff[kDiff]
    if (i < n - 1) { 
      // move diff from right to left
      rightDiffFreq[diff[i + 1]]--;
      leftDiffFreq[diff[i + 1]] = (leftDiffFreq[diff[i + 1]] || 0) + 1;
    }
  }
  return ans;
};

// Three test cases
console.log(waysToPartition([2,-1,2], 3)) // 1
console.log(waysToPartition([0,0,0], 1)) // 2
console.log(waysToPartition([22,4,-25,-20,-15,15,-16,7,19,-10,0,-13,-14], -33)) // 4