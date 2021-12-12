// 2104. Sum of Subarray Ranges
// You are given an integer array nums. The range of a subarray of nums is the difference between the largest and smallest element in the subarray.
// Return the sum of all subarray ranges of nums.
// A subarray is a contiguous non-empty sequence of elements within an array.


// Solution 1: Brute Force

// Two loops, count the minimum and maximum number, and add the difference to the answer.

// Time Complexity: O(n^2)
// Space Complexity: O(1)
var subArrayRanges = function(nums) {
  let n = nums.length;
  let ans = 0;
  for (var i = 0; i < n; i++) {
    let min = nums[i], max = nums[i];
    for (var j = i + 1; j < n; j++) {
      min = Math.min(min, nums[j]);
      max = Math.max(max, nums[j]);
      ans += max - min;
    }
  }
  return ans;
};

// Solution 2: Monotonic Stack

// The same as 907. Sum of Subarray Minimums, except we need to find the maximum too, and instead of adding the minimum, we take it off the final sum.

// Time Complexity: O(n) 80ms
// Space Complexity: O(n) 43.4MB
var subArrayRanges = function(nums) {
  let n = nums.length, ans = 0;
  let stack = [-1];
  let left = Array(n), right = Array(n);
  // subtract sum of minimum, using monotonic increasing stack
  for (var i = 0; i < n; i++) {
    while (stack[stack.length - 1] !== -1 && nums[stack[stack.length - 1]] >= nums[i]) stack.pop();
    left[i] = i - stack[stack.length - 1];
    stack.push(i);
  }
  stack = [n];
  for (i = n - 1; i >= 0; i--) {
    while (stack[stack.length - 1] !== n && nums[stack[stack.length - 1]] > nums[i]) stack.pop();
    right[i] = stack[stack.length - 1] - i;
    ans -= nums[i] * left[i] * right[i];
    stack.push(i);
  }

  // find sum of maximum, using monotonic decreasing stack
  stack = [-1];
  for (i = 0; i < n; i++) {
    while (stack[stack.length - 1] !== -1 && nums[stack[stack.length - 1]] <= nums[i]) stack.pop();
    left[i] = i - stack[stack.length - 1];
    stack.push(i);
  }
  stack = [n];
  for (i = n - 1; i >= 0; i--) {
    while (stack[stack.length - 1] !== n && nums[stack[stack.length - 1]] < nums[i]) stack.pop();
    right[i] = stack[stack.length - 1] - i;
    ans += nums[i] * left[i] * right[i];
    stack.push(i);
  }
  return ans;
};

// Three test cases to run function on
console.log(subArrayRanges([1,2,3])) // 4
console.log(subArrayRanges([1,3,3])) // 4
console.log(subArrayRanges([4,-2,-3,4,1])) // 59