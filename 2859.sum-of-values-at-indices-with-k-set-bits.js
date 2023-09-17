// 2859. Sum of Values at Indices With K Set Bits
// You are given a 0-indexed integer array nums and an integer k.
// Return an integer that denotes the sum of elements in nums whose corresponding indices have exactly k set bits in their binary representation.
// The set bits in an integer are the 1's present when it is written in binary.
  // For example, the binary representation of 21 is 10101, which has 3 set bits.


// Solution: 

// Go through each number and get the sum of numbers with k set bits in their binary representation.
// To count the number of set bits in a number, process the bits from right to left: checking the rightmost bit, then shifting all bits to the right by 1.

// n = length of nums
// Time Complexity: O(n log(n)) 56ms
// Space Complexity: O(1) 43.9MB
var sumIndicesWithKSetBits = function(nums, k) {
  let n = nums.length, sum = 0;
  for (let i = 0; i < n; i++) {
    if (countOnes(i) === k) sum += nums[i];
  }
  return sum;
};

function countOnes(num) {
  let ones = 0;
  while (num > 0) {
    ones += (num & 1);
    num >>= 1;
  }
  return ones;
}

// Two test cases
console.log(sumIndicesWithKSetBits([5,10,1,5,2], 1)) // 13
console.log(sumIndicesWithKSetBits([4,3,2,1], 2)) // 1