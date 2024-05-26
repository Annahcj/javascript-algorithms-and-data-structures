// 3164. Find the Number of Good Pairs II
// You are given 2 integer arrays nums1 and nums2 of lengths n and m respectively. You are also given a positive integer k.
// A pair (i, j) is called good if nums1[i] is divisible by nums2[j] * k (0 <= i <= n - 1, 0 <= j <= m - 1).
// Return the total number of good pairs.


// Solution: Hashmap & Factorization

// 1. Count the occurances of each nums2[j] * k in a hashmap.
// 2. Go through each factor of each nums1[i] (there are at most 2 * sqrt(nums1[i]) factors).
  // For each factor, add the occurances of nums2 to the total sum of good pairs.

// n = length of nums1, m = length of nums2
// Time Complexity: O(m + n * sqrt(n)) 1111ms
// Space Complexity: O(m) 92.9MB
var numberOfPairs = function(nums1, nums2, k) {
  let n = nums1.length, m = nums2.length;
  let count = {};
  for (let j = 0; j < m; j++) {
   count[nums2[j] * k] = (count[nums2[j] * k] || 0) + 1;
  }
  let ans = 0;
  for (let i = 0; i < n; i++) {
    for (let factor = 1; factor <= Math.sqrt(nums1[i]); factor++) {
      if (nums1[i] % factor === 0) {
        ans += (count[factor] || 0);
        if (factor !== nums1[i] / factor) {
          ans += (count[nums1[i] / factor] || 0);
        }
      }
    }
  }
  return ans;
};

// Two test cases
console.log(numberOfPairs([1,3,4], [1,3,4], 1)) // 5
console.log(numberOfPairs([1,2,4,12], [2,4], 3)) // 2