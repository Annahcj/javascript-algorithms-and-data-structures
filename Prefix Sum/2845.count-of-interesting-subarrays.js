// 2845. Count of Interesting Subarrays
// You are given a 0-indexed integer array nums, an integer modulo, and an integer k.
// Your task is to find the count of subarrays that are interesting.
// A subarray nums[l..r] is interesting if the following condition holds:
  // Let cnt be the number of indices i in the range [l, r] such that nums[i] % modulo == k. Then, cnt % modulo == k.
// Return an integer denoting the count of interesting subarrays.
// Note: A subarray is a contiguous non-empty sequence of elements within an array.


// Solution: Prefix Sum & Hashmap w/ Modulo 

// Convert each nums[i] into 1 if nums[i] % modulo === k, otherwise 0.
// Now the problem turns into finding the number of subarrays where the sum % modulo === k.
// Go through nums while keeping track of the prefix sum so far.
  // Use a hashmap to store the count of subarrays with each prefix sum % modulo.
  // Accumulate the total sum of count[(sum - k) % modulo]

// Explanation for (sum - k + modulo) % modulo:
  // Subarray sizes look like:
    // k
    // k + mod
    // k + mod + mod
    // k + mod + mod + mod
    // ...
  // Hence, we subtract k from sum.
  // e.g: modulo = 3, k = 2
  // Sums where sum % modulo === k: 2,5,8,11,14,...   
  // Starting with k, adds on modulo each time.

// Example: values = [1,0,0,1,0,0], modulo = 2, k = 1
  // To account for the case where the subarray starts at index 0, initialize count[0] = 1.
  // We use counts that end at the same mod value - 1 to count the number of subarrays ending at each index i.
  // e.g: 
    // i = 3 ([1,0,0,__1__,0,0]), count = [1,3], kMod = (2 - 1 + 2) % 2 = 1, count[kMod] = 3. Subarrays: [[0,0,1],[0,1],[1]] starting at indices (1,2,3)

// Time Complexity: O(n) 102ms
// Space Complexity: O(n) 61.9MB
var countInterestingSubarrays = function(nums, modulo, k) {
  let values = nums.map((num) => num % modulo === k ? 1 : 0);
  let n = nums.length, count = Array(Math.min(n, modulo)).fill(0);
  count[0] = 1; 
  let sum = 0, subarrays = 0;
  for (let i = 0; i < n; i++) {
    sum += values[i];
    let kMod = (sum - k + modulo) % modulo;
    subarrays += kMod >= n ? 0 : count[kMod];
    count[sum % modulo]++;
  }
  return subarrays;
};

// Two test cases
console.log(countInterestingSubarrays([3,2,4], 2, 1)) // 3
console.log(countInterestingSubarrays([3,1,9,6], 3, 0)) // 2