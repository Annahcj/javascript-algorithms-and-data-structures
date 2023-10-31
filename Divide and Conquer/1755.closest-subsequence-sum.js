// 1755. Closest Subsequence Sum
// You are given an integer array nums and an integer goal.
// You want to choose a subsequence of nums such that the sum of its elements is the closest possible to goal. That is, if the sum of the subsequence's elements is sum, then you want to minimize the absolute difference abs(sum - goal).
// Return the minimum possible value of abs(sum - goal).
// Note that a subsequence of an array is an array formed by removing some elements (possibly all or none) of the original array.


// Solution: Meet in the middle

// Divide nums into two halves -> left, right
// Generate all possible sums for the left half and store in an array -> left
// Generate all possible sums for the right half and store in an array -> right

// Sort the right half in asc order.
// Now we can loop through left and binary search through right to find the closest total sum to goal.

// Time Complexity: O(2^(n/2)) 1565ms
// Space Complexity: O(n) 133.3MB
var minAbsDifference = function(nums, goal) {
  let midPoint = Math.floor(nums.length / 2);
  let left = [], right = [];
  // generate all possible sums for left half
  generateSums(0, midPoint, 0, left);
  // generate all possible sums for right half
  generateSums(midPoint, nums.length, 0, right);

  // sort right half
  right.sort((a, b) => a - b);

  let ans = Infinity;
  for (let sum of left) {
    let target = goal - sum;
    // binary search to find closest possible to target
    let idx = binarySearch(right, target);
    ans = Math.min(ans, Math.abs(right[idx] - target));
    // note: the binary search returns first element larger than target, so we have to check for idx - 1 also
    if (idx > 0) ans = Math.min(ans, Math.abs(right[idx - 1] - target));
  }
  return ans;

  // binary search to find first element larger than target
  function binarySearch(arr, target) {
    let low = 0, high = arr.length - 1;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (arr[mid] > target) high = mid;
      else low = mid + 1;
    }
    return low;
  }
  // generate all possible sums from the array half
  function generateSums(i, end, currSum, arr) {
    if (i === end) {
      arr.push(currSum);
      return;
    }
    generateSums(i + 1, end, currSum, arr);
    generateSums(i + 1, end, currSum + nums[i], arr);
  } 
};

// Three test cases
console.log(minAbsDifference([5,-7,3,5], 6)) // 0
console.log(minAbsDifference([7,-9,15,-2], -5)) // 1
console.log(minAbsDifference([1,2,3], -7)) // 7