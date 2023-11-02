// 2653. Sliding Subarray Beauty
// Given an integer array nums containing n integers, find the beauty of each subarray of size k.
// The beauty of a subarray is the xth smallest integer in the subarray if it is negative, or 0 if there are fewer than x negative integers.
// Return an integer array containing n - k + 1 integers, which denote the beauty of the subarrays in order from the first index in the array.
  // A subarray is a contiguous non-empty sequence of elements within an array.


// Solution: Sliding Window w/ Counting

// Maintain a sliding window of size k.
// Keep track of:
  // negative: the count of negative integers currently in the window.
  // count: the count of occurances for each negative integer (count[j] = occurances of -j in the current window)

// For each window, go through each count[j] from right to left and check if the total count of occurances >= x. 
// If total count >= x, then j is the xth smallest number.

// n = length of nums, m = min(nums[i])
// Time Complexity: O(nm) 360ms
// Space Complexity: O(n + m) 78.8MB
var getSubarrayBeauty = function(nums, k, x) {
  let n = nums.length, negatives = 0, min = Math.abs(Math.min(...nums));
  let count = Array(min + 1).fill(0), res = [];
  for (let i = 0; i < n; i++) {
    if (nums[i] < 0) {
      negatives++;
      count[-nums[i]]++;
    }
    if (i >= k && nums[i - k] < 0) {
      negatives--;
      count[-nums[i - k]]--;
    }
    if (i >= k - 1) {
      if (negatives < x) res.push(0);
      else {
        let totalCount = 0;
        for (let j = min; j > 0; j--) {
          totalCount += count[j];
          if (totalCount >= x) {
            res.push(-j);
            break;
          }
        } 
      }
    }
  }
  return res;
};

// Three test cases
console.log(getSubarrayBeauty([1,-1,-3,-2,3], 3, 2)) // [-1,-2,-2]
console.log(getSubarrayBeauty([-1,-2,-3,-4,-5], 2, 2)) // [-1,-2,-3,-4]
console.log(getSubarrayBeauty([-3,1,2,-3,0,-3], 2, 1)) // [-3,0,-3,-3,-3]