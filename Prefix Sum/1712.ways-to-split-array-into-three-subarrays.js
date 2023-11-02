// 1712. Ways to Split Array Into Three Subarrays
// A split of an integer array is good if:
  // The array is split into three non-empty contiguous subarrays - named left, mid, right respectively from left to right.
  // The sum of the elements in left is less than or equal to the sum of the elements in mid, and the sum of the elements in mid is less than or equal to the sum of the elements in right.
// Given nums, an array of non-negative integers, return the number of good ways to split nums. As the number may be too large, return it modulo 109 + 7.


// Solution 1: Prefix Sum & Binary Search

// Build the prefix sum of nums.
// For every i in nums, 
  // Binary search for the smallest split index while maintaining that the leftsum <= midsum
  // Binary search for the biggest split index while maintaining that the midsum <= rightsum
  // add (biggest split index - smallest split index + 1) to the answer.

// Time Complexity: O(n log(n)) 256ms
// Space Complexity: O(n) 54.1MB
var waysToSplit = function(nums) {
  let n = nums.length, psum = Array(n);
  psum[0] = nums[0];
  for (let i = 1; i < n; i++) psum[i] = psum[i - 1] + nums[i];
  
  let ans = 0, mod = 10 ** 9 + 7;
  for (let i = 0; i < n - 2; i++) {
    // binary search for lower and upper bound
    // leftSum <= midSum <= rightSum
    let leftSum = psum[i];
    let lowerBound = lower_bound(i + 1, n - 2, leftSum);
    let upperBound = upper_bound(i + 1, n - 2, leftSum);
    if (lowerBound === -1 || upperBound === -1) continue;
    ans = (ans + upperBound - lowerBound + 1) % mod;
  }
  return ans;
  
  // split index = end of left subarray
  
  // finds the smallest split index while maintaining that the leftsum <= midsum
  function lower_bound(low, high, leftSum) {
    let start = low, end = high + 1;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      let midSum = psum[mid] - leftSum, rightSum = psum[end] - psum[mid];
      if (midSum >= leftSum) high = mid;
      else low = mid + 1;
    }
    let midSum = psum[low] - leftSum, rightSum = psum[end] - psum[low];
    return leftSum <= midSum && midSum <= rightSum ? low : -1;
  }
  
  // finds the biggest split index while maintaining that the midsum <= rightsum
  function upper_bound(low, high, leftSum) {
    let start = low, end = high + 1;
    while (low < high) {
      let mid = Math.ceil((low + high) / 2);
      let midSum = psum[mid] - leftSum, rightSum = psum[end] - psum[mid];
      if (midSum <= rightSum) low = mid;
      else high = mid - 1;
    }
    let midSum = psum[low] - leftSum, rightSum = psum[end] - psum[low];
    return leftSum <= midSum && midSum <= rightSum ? low : -1;
  }
};


// Solution 2: Prefix Sum & Three Pointers

// Build the prefix sum of nums.
// For every i in nums, 
  // Find the smallest split index while maintaining that the leftsum <= midsum
  // Find the biggest split index while maintaining that the midsum <= rightsum
  // add (biggest split index - smallest split index) to the answer.

// Time Complexity: O(n) 84ms
// Space Complexity: O(n) 52.7MB
var waysToSplit = function(nums) {
  let n = nums.length, psum = Array(n), mod = 10 ** 9 + 7;
  psum[0] = nums[0];
  for (let i = 1; i < n; i++) psum[i] = psum[i - 1] + nums[i];
  
  let j = 0, k = 0, ans = 0;
  for (let i = 0; i < n - 2; i++) {
    // find the minimum start for mid subarray
    j = Math.max(j, i + 1);
    while (j < n - 1 && psum[j] < psum[i] * 2) j++; // make sure left sum >= mid sum
    
    // find the maximum end for mid subarray
    k = Math.max(k, j);
    while (k < n - 1 && psum[k] - psum[i] <= psum[n - 1] - psum[k]) k++; // make sure mid sum <= end sum
    
    ans = (ans + k - j) % mod;
  }
  return ans;
};

// Three test cases
console.log(waysToSplit([1,1,1])) // 1
console.log(waysToSplit([1,2,2,2,5,0])) // 3
console.log(waysToSplit([3,2,1])) // 0