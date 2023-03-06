// 327. Count of Range Sum
// Given an integer array nums and two integers lower and upper, return the number of range sums that lie in [lower, upper] inclusive.
// Range sum S(i, j) is defined as the sum of the elements in nums between indices i and j inclusive, where i <= j.


// Solution: Merge Sort

// In merge sort, arrays will be split into two halves and sorted recursively, then merged back together.
// Use merge sort on the prefix sum array of nums.
// The numbers in the first half will always come before numbers in the second half, so we can use two pointers in the second half to find the lower and upper bound of sums that are within the range.
// Due to the properties of merge sort, we are able to use the sorted halves of the array to get the range size.
  // Use three pointers:
    // i = pointer in the left half
    // j, k = pointers in the right half
      // j = the index of the lower end of the range (first k where sum[k] - sum[i] >= lower)
      // k = the index of the upper end of the range (last j where sum[j] - sum[i] <= upper)
  // Use the prefix sums to find the sum of the subarrays in between.
  // The number of subarrays within range = k - j + 1

// Time Complexity: O(n log(n)) 332ms
// Space Complexity: O(n) 72.1MB
var countRangeSum = function(nums, lower, upper) {
  let sum = [0, ...nums], n = sum.length;  
  for (let i = 2; i < n; i++) {
    sum[i] += sum[i - 1];
  }
  let ans = 0;
  mergeSort(sum);
  return ans;
  
  function mergeSort(arr) {
    if (arr.length === 1) return arr;
    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));
    return merge(left, right);
  }
  
  function merge(left, right) {
    for (let i = 0, j = 0, k = 0; i < left.length; i++) {
      while (k < right.length - 1 && right[k + 1] - left[i] <= upper) k++;
      while (j < right.length && right[j] - left[i] < lower) j++;
      ans += right[j] - left[i] < lower || right[k] - left[i] > upper ? 0 : k - j + 1;
    }
    let i = 0, j = 0, merged = [];
    while (i < left.length || j < right.length) {
      if (j === right.length || left[i] <= right[j]) {
        merged.push(left[i++]);
      } else if (i === left.length || right[j] < left[i]) {
        merged.push(right[j++]);
      }
    }
    return merged;
  }
};

// Three test cases
console.log(countRangeSum([-2,5,-1], -2, 2)) // 3
console.log(countRangeSum([0], 0, 0)) // 1
console.log(countRangeSum([1,4,7,-3,1], 8, 9)) // 3