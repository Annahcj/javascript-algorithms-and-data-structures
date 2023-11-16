// 1980. Find Unique Binary String
// Given an array of strings nums containing n unique binary strings each of length n, return a binary string of length n that does not appear in nums. If there are multiple answers, you may return any of them.


// Solution 1: Enumeration

// Go through each combination of binary strings (0 to 2^n) and return the first one which nums does not already contain.

// Time Complexity: O(2^n) 55ms
// Space Complexity: O(n) 41.8MB
var findDifferentBinaryString = function(nums) {
  nums = new Set(nums);
  let n = nums.size;
  for (let i = 0; i < (1 << n); i++) {
    let str = i.toString(2), finalStr = str + '0'.repeat(n - str.length); // pad with extra zeros
    if (!nums.has(finalStr)) return finalStr;
  }
};


// Solution 2: Enumerate Powers of Two

// Since there are n strings that each contain only n bits, we can always find one power of two (including 0 and 1) that doesn't appear in nums.

// e.g: n = 5
  // 00000
  // 10000
  // 01000
  // 00100
  // 00010
  // 00001

// Time Complexity: O(n^2) 54ms
// Space Complexity: O(n^2) 42MB
var findDifferentBinaryString = function(nums) {
  let n = nums.length, numsSet = new Set(nums);
  let zero = '0'.repeat(n);
  if (!numsSet.has(zero)) return zero;
  for (let i = 0; i < n; i++) {
    let str = `${'0'.repeat(i)}1${'0'.repeat(n - i - 1)}`;
    if (!numsSet.has(str)) return str;
  }
};


// Solution 3: Flip ith bit of the ith string

// Flip the ith bit of the ith string.
// This ensures the final string will not be the same as any of the binary strings since at least one bit is different.

// Time Complexity: O(n^2) 47ms
// Space Complexity: O(1) 42.4MB
var findDifferentBinaryString = function(nums) {
  let n = nums.length, res = "";
  for (let i = 0; i < n; i++) {
    res += nums[i][i] === '0' ? '1' : '0';
  }
  return res;
};