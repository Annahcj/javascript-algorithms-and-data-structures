// 1793. Maximum Score of a Good Subarray
// You are given an array of integers nums (0-indexed) and an integer k.
// The score of a subarray (i, j) is defined as min(nums[i], nums[i+1], ..., nums[j]) * (j - i + 1). A good subarray is a subarray where i <= k <= j.
// Return the maximum possible score of a good subarray.


// Solution 1: Monotonic Increasing Stack

// Keep a monotonic increasing stack of indexes.
// Go through each index j.
  // Pop off indexes from the top of the stack while stack[stack.length - 1] >= nums[j].
  // As we pop a number off the stack, we can have a subarray with stack[stack.length - 1] as the minimum element. 
    // Anything between index stack[stack.length - 1] and index j will be larger than or equal to nums[j].
    // Anything between index stack[stack.length - 2] + 1 and stack[stack.length - 1] will be larger than or equal to stack[stack.length - 1].
    // subarray start index = stack[stack.length - 2] + 1
    // subarray end index = j - 1
    // Record the maximum (subarray length * popped number)

// At the end, go through the remaining indexes in the stack and record the maximum (n - stack[i]) * stack[i].

// Note: We must check that startIndex <= k.

// Time Complexity: O(n) 107ms
// Space Complexity: O(n) 53.1MB
var maximumScore = function(nums, k) {
  let n = nums.length, stack = [], maxScore = 0;
  for (let j = 0; j < n; j++) {
    while (stack.length && nums[stack[stack.length - 1]] >= nums[j]) {
      let index = stack.pop();
      if (j > k) {
        let startIndex = stack.length ? stack[stack.length - 1] : -1;
        let len = j - startIndex - 1;
        if (startIndex < k) {
          maxScore = Math.max(maxScore, len * nums[index]);
        }
      }
    }
    stack.push(j);
  }
  for (let i = 0; i < stack.length; i++) {
    let startIndex = i === 0 ? -1 : stack[i - 1];
    let len = n - startIndex - 1;
    if (startIndex < k) {
      maxScore = Math.max(maxScore, len * nums[stack[i]]);
    }
  }
  return maxScore;
};


// Solution 2: Sliding Window

// Start the sliding window with (i, j) = k.
// Expand as much as possible on the left and right while nums[i] >= current minimum.
// If both sides have smaller numbers, then we expand on the side with the larger number first.
// The reason why we expand on the side with the larger number:
  // If we expand on the side with the smaller number, the larger number will be included in the new subarray anyway, however if we expand on the side of the larger number first we have potential to have a higher score since we have a larger number.

// Time Complexity: O(n) 94ms
// Space Complexity: O(1) 52.9MB
var maximumScore = function(nums, k) {
  let n = nums.length, i = k, j = k;
  let currMin = nums[k], ans = nums[k];
  while (i >= 0 || j < n) {
    while (i >= 0 && nums[i] >= currMin) i--;
    while (j < n && nums[j] >= currMin) j++;
    ans = Math.max(ans, (j - i - 1) * currMin);
    if (i < 0) {
      currMin = nums[j++];
    } else if (j === n) {
      currMin = nums[i--];
    } else {
      if (nums[i] >= nums[j]) {
        currMin = nums[i--];
      } else {
        currMin = nums[j++];
      }
    }
  }
  return ans;
};

// Two test cases
console.log(maximumScore([1,4,3,7,4,5], 3)) // 15
console.log(maximumScore([5,5,4,5,4,1,1,1], 0)) // 20