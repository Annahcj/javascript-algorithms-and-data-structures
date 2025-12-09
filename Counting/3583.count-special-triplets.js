// 3583. Count Special Triplets
// You are given an integer array nums.
// A special triplet is defined as a triplet of indices (i, j, k) such that:
  // 0 <= i < j < k < n, where n = nums.length
  // nums[i] == nums[j] * 2
  // nums[k] == nums[j] * 2
// Return the total number of special triplets in the array.
// Since the answer may be large, return it modulo 10^9 + 7.


// Solution: Counting w/ Hashmap

// Iterate through nums anchoring at index j,
// while keeping track of the count of occurrances of each number on the left and right of j.

// For each nums[j], the number of triplets is counted by multiplying the count of nums[j] * 2 on the left and right of j.

// Time Complexity: O(n) 448ms
// Space Complexity: O(n) 89MB
function specialTriplets(nums) {
  const countRight = {}, n = nums.length;
  for (let i = 0; i < n; i++) {
    countRight[nums[i]] = (countRight[nums[i]] || 0) + 1;
  }
  const countLeft = {}, MOD = 1000000007;
  let ans = 0;
  for (let j = 0; j < n; j++) {
    countRight[nums[j]]--;
    const triplets = ((countLeft[nums[j] * 2] || 0) * (countRight[nums[j] * 2] || 0)) % MOD;
    ans = (ans + triplets) % MOD;
    countLeft[nums[j]] = (countLeft[nums[j]] || 0) + 1;
  }
  return ans;
};

// Three test cases
console.log(specialTriplets([6,3,6])) // 1
console.log(specialTriplets([0,1,0,0])) // 1
console.log(specialTriplets([8,4,2,8,4])) // 2