// 2176. Count Equal and Divisible Pairs in an Array
// Given a 0-indexed integer array nums of length n and an integer k, return the number of pairs (i, j) where 0 <= i < j < n, such that nums[i] == nums[j] and (i * j) is divisible by k.


// Solution: Brute Force

// Time Complexity: O(n^2) 2ms
// Space Complexity: O(1) 53.7MB
function countPairs(nums, k) {
  const n = nums.length;
  let pairs = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (nums[i] === nums[j] && (i * j) % k === 0) {
        pairs++;
      }
    }
  }  
  return pairs;
};

// Two test cases
console.log(countPairs([3,1,2,2,2,1,3], 2)) // 4
console.log(countPairs([1,2,3,4], 1)) // 0