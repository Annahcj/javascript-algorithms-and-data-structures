// 1862. Sum of Floored Pairs
// Given an integer array nums, return the sum of floor(nums[i] / nums[j]) for all pairs of indices 0 <= i, j < nums.length in the array. Since the answer may be too large, return it modulo 10^9 + 7.
// The floor() function returns the integer part of the division.


// Solution: Prefix Sum

// 1. Count the frequency of each number.
// 2. Build up a prefix sum based on the frequencies (nums[i] <= 10^5).
// 3. For each unique number `num` in nums,
  // Iterate through multiples of num and use the prefix sum to find the frequency of numbers in the range (multiple + 1, multiple + num), since it's Math.floor(nums[i] / nums[j]) i.e: rounding down.
  // For each multiple, add to the total sum: multiple * frequency of numbers in the range (multiple + 1, multiple + num) * frequency of num

// e.g: num = 3
  // divisionResult: 1, range: [3,4,5]
  // divisionResult: 2, range: [6,7,8]
  // divisionResult: 3, range: [9,10,11]
  // ...etc

// n = length of nums, m = max(nums[i])
// Time Complexity: O(n + m + (m/2) + (m/3) + ... + 1) = O(n + m * (m + 1) / 2) 1263ms
// Space Complexity: O(n + m) 100.9MB
var sumOfFlooredPairs = function(nums) {
  let max = Math.max(...nums), freq = Array(max + 1).fill(0);
  for (let num of nums) {
    freq[num]++;
  }
  for (let i = 1; i <= max; i++) {
    freq[i] += freq[i - 1];
  }
  let unique = new Set(nums), ans = 0n, MOD = 1000000007n;
  for (let num of unique) {
    let numFreq = BigInt(freq[num] - freq[num - 1]);
    for (let multiple = num; multiple <= max; multiple += num) {
      let rangeEnd = multiple + num - 1;
      let rangeFreq = BigInt(freq[Math.min(max, rangeEnd)] - freq[multiple - 1]);
      let divisionResult = BigInt(multiple / num);
      ans = (ans + divisionResult * rangeFreq * numFreq) % MOD;
    }
  }
  return ans;
};

// Two test cases
console.log(sumOfFlooredPairs([2,5,9])) // 10
console.log(sumOfFlooredPairs([7,7,7,7,7,7,7])) // 49