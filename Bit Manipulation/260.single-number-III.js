// 260. Single Number III
// Given an integer array nums, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once. You can return the answer in any order.
// You must write an algorithm that runs in linear runtime complexity and uses only constant extra space.


// Solution: Bitwise XOR

// XORing together two numbers will become 0.
// e.g. 5 ^ 5 = 0, 10 ^ 10 = 0, etc.
// Since all other elements have exactly 2 occurances, after we XOR together all elements of nums, we will be left with the XOR value of the two single elements.
// We know these two elements will be different, meaning that at least one bit will be set.
// Find a set bit using (xor & -xor: finds the rightmost set bit), and find the total XOR value of numbers WITH this bit set, and find the total XOR value of numbers WITHOUT this bit set.

// Time Complexity: O(n) 56ms
// Space Complexity: O(1) 51.5MB
var singleNumber = function(nums) {
  let xor = 0;
  for (let num of nums) {
    xor ^= num;
  }
  let differentBit = xor & -xor;
  let xor1 = 0, xor2 = 0;
  for (let num of nums) {
    if (num & differentBit) {
      xor1 ^= num;
    } else {
      xor2 ^= num;
    }
  }
  return [xor1, xor2];
};

// Three test cases
console.log(singleNumber([1,2,1,3,2,5])) // [3,5]
console.log(singleNumber([-1,0])) // [-1,0]
console.log(singleNumber([0,1])) // [1,0]