// 974. Subarray Sums Divisible by K
// Given an integer array nums and an integer k, return the number of non-empty subarrays that have a sum divisible by k.


// Solution: Prefix Sum w/ Hashmap

// 1. Calculate the prefix sum of nums -> pSum
// 2. Use a hashmap to store the frequency of the mods of prefix sums

// e.g: nums = [1,2,3,4,5], k = 5
// pSum = [1,3,6,10,15]
// Store the mods of prefix sums in the hashmap on the go.
// For each prefix sum, find the number of past prefix sums that have the same mod value as it. 

// For negative numbers, get the mod value, then add k.
// e.g: [-1, 5], k = 5
// -1 is equivalent to 4 since we only take the mod value.
// -1 + 5 = 4 % 5 = 4. 
//  4 + 5 = 9 % 5 = 4.

// Time Complexity: O(n) 104ms
// Space Complexity: O(n) 45.1MB
var subarraysDivByK = function(nums, k) {
  let n = nums.length, pSum = Array(n);
  for (var i = 0; i < n; i++) {
    let prevSum = i === 0 ? 0 : pSum[i - 1];
    pSum[i] = prevSum + nums[i];
  }
  let sumFreq = {0: 1}, ans = 0;
  for (i = 0; i < n; i++) {
    let modK = pSum[i] % k; // get the mod of pSum[i]
    if (modK < 0) modK += k; // if less than 0, for e.g: -1, k = 5 -> it is equivalent to 4.
    if (sumFreq[modK]) ans += sumFreq[modK];
    sumFreq[modK] = (sumFreq[modK] || 0) + 1;
  }
  return ans;
};

// Two test cases to run function on
console.log(subarraysDivByK([4,5,0,-2,-3,1], 5)) // 7
console.log(subarraysDivByK([5], 9)) // 0