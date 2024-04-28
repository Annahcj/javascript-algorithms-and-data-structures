// 3134. Find the Median of the Uniqueness Array
// You are given an integer array nums. The uniqueness array of nums is the sorted array that contains the number of distinct elements of all the subarrays of nums. In other words, it is a sorted array consisting of distinct(nums[i..j]), for all 0 <= i <= j < nums.length.
// Here, distinct(nums[i..j]) denotes the number of distinct elements in the subarray that starts at index i and ends at index j.
// Return the median of the uniqueness array of nums.
// Note that the median of an array is defined as the middle element of the array when it is sorted in non-decreasing order. If there are two choices for a median, the smaller of the two values is taken.


// Solution: Binary Search

// Binary search for the smallest distinct count x where the number of subarrays with <= x distinct characters is less than the median number of subarrays.

// To count the number of subarrays with less than or equal to x distinct characters, use a sliding window and a hashmap.
// Count the number of subarrays ending at each index j, and move up the left pointer i if the number of distinct numbers exceeds x.

// Time Complexity: O(n log(n)) 1235ms
// Space Comlexity: O(n) 78.9MB
var medianOfUniquenessArray = function(nums) {
  let n = nums.length, totalSubarrays = n * (n + 1) / 2;
  let medianThreshold = Math.ceil(totalSubarrays / 2);
  let low = 1, high = n;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (countSubarrays(mid) >= medianThreshold) high = mid;
    else low = mid + 1;
  }
  return low;
  
  function countSubarrays(maxDistinct) {
    let subarrays = 0, count = {}, distinct = 0;
    for (let i = 0, j = 0; j < n; j++) {
      count[nums[j]] = (count[nums[j]] || 0) + 1;
      if (count[nums[j]] === 1) distinct++;
      while (distinct > maxDistinct) {
        count[nums[i]]--;
        if (count[nums[i]] === 0) distinct--;
        i++;
      }
      subarrays += (j - i + 1);
    }
    return subarrays;
  }
};

// Three test cases
console.log(medianOfUniquenessArray([1,2,3])) // 1
console.log(medianOfUniquenessArray([3,4,3,4,5])) // 2
console.log(medianOfUniquenessArray([4,3,5,4])) // 2