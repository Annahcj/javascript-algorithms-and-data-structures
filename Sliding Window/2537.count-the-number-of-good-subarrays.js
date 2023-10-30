// 2537. Count the Number of Good Subarrays
// Given an integer array nums and an integer k, return the number of good subarrays of nums.
// A subarray arr is good if it there are at least k pairs of indices (i, j) such that i < j and arr[i] == arr[j].
// A subarray is a contiguous non-empty sequence of elements within an array.


// Solution: Sliding Window 

// If a subarray has at least k good pairs, then we know that expanding the subarray will always also result in at least k good pairs.
// Keep track of the count of occurances of each number.
// Keep track of two pointers i and j for our sliding window.
  // As we move j up, we will gain another count[nums[j]] good pairs.
  // Move i up while the good pairs >= k. When we move i up, we subtract count[nums[i]] - 1 good pairs.
  // Then, we will know that all subarrays with start index between 0 and i - 1, and end index at j will have at least k good pairs.
  // i = the number of subarrays ending at index j that have at least k good pairs. Add i to the number of good subarrays.

// Time Complexity: O(n) 205ms
// Space Complexity: O(n) 72.9MB
var countGood = function(nums, k) {
  let n = nums.length, count = {}, goodPairs = 0, ans = 0;
  for (let j = 0, i = 0; j < n; j++) {
    goodPairs += count[nums[j]] || 0;
    count[nums[j]] = (count[nums[j]] || 0) + 1;
    while (goodPairs >= k) {
      goodPairs -= --count[nums[i]];
      i++;
    }
    ans += i;
  }
  return ans;
};

// Three test cases
console.log(countGood([1,1,1,1,1], 10)) // 1
console.log(countGood([3,1,4,3,2,2,4], 2)) // 4
console.log(countGood([2,1,3,1,2,2,3,3,2,2,1,1,1,3,1], 11)) // 21