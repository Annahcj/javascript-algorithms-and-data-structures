// 3404. Count Special Subsequences
// You are given an array nums consisting of positive integers.
// A special subsequence is defined as a subsequence of length 4, represented by indices (p, q, r, s), where p < q < r < s. This subsequence must satisfy the following conditions:
  // nums[p] * nums[r] == nums[q] * nums[s]
  // There must be at least one element between each pair of indices. In other words, q - p > 1, r - q > 1 and s - r > 1.
// A subsequence is a sequence derived from the array by deleting zero or more elements without changing the order of the remaining elements.
// Return the number of different special subsequences in nums.


// Solution: Hashmap

// p * r == q * s
// = 
// p / q == s / r

// Keep the running count of nums[p] / nums[q] for every pair.
// Iterate through every pair (r, s) where r is anchored at q + 2.

// Time Complexity: O(n^2) 1994ms
// Space Complexity: O(n^2) 86.02MB
function numberOfSubsequences(nums) {
  const n = nums.length, count = {};
  let subsequences = 0;
  for (let q = 2; q <= n - 5; q++) {
    for (let p = q - 2; p >= 0; p--) {
      const pq = nums[p] / nums[q];
      count[pq] = (count[pq] || 0) + 1;
    }
    for (let s = q + 4; s < n; s++) {
      const sr = nums[s] / nums[q + 2];
      subsequences += (count[sr] || 0);
    }
  }  
  return subsequences;
};

// Two test cases
console.log(numberOfSubsequences([1,2,3,4,3,6,1])) // 1
console.log(numberOfSubsequences([3,4,3,4,3,4,3,4])) // 3 