// 962. Maximum Width Ramp
// A ramp in an integer array nums is a pair (i, j) for which i < j and nums[i] <= nums[j]. The width of such a ramp is j - i.
// Given an integer array nums, return the maximum width of a ramp in nums. If there is no ramp in nums, return 0.


// Solution: Monotonic Decreasing Stack & Binary Search

// Keep a monotonic decreasing stack, there is no point in keeping bigger or equal numbers that are at later indexes.
// For each nums[i], use binary search for the leftmost index in the stack where nums[stack[index]] <= nums[i].
// Only push the current number into the stack if it is smaller than the last number on the stack.

// Time Complexity: O(n log(n)) 109ms
// Space Complexity: O(n) 48.2MB
var maxWidthRamp = function(nums) {
  let stack = [], ans = 0;
  for (let i = 0; i < nums.length; i++) {
    let index = lower_bound(stack, i);
    ans = Math.max(ans, i - index);
    if (!stack.length || nums[i] < nums[stack[stack.length - 1]]) stack.push(i);
  }
  return ans;
  
  function lower_bound(arr, index) {
    if (!arr.length) return index;
    let low = 0, high = arr.length - 1;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (nums[arr[mid]] <= nums[index]) high = mid;
      else low = mid + 1;
    }
    return nums[arr[low]] <= nums[index] ? arr[low] : index;
  }
};

// Three test cases
console.log(maxWidthRamp([6,0,8,2,1,5])) // 4
console.log(maxWidthRamp([9,8,1,0,1,9,4,0,4,1])) // 7
console.log(maxWidthRamp([3,2])) // 0