// 2354. Number of Excellent Pairs
// You are given a 0-indexed positive integer array nums and a positive integer k.
// A pair of numbers (num1, num2) is called excellent if the following conditions are satisfied:
  // Both the numbers num1 and num2 exist in the array nums.
  // The sum of the number of set bits in num1 OR num2 and num1 AND num2 is greater than or equal to k, where OR is the bitwise OR operation and AND is the bitwise AND operation.
// Return the number of distinct excellent pairs.
// Two pairs (a, b) and (c, d) are considered distinct if either a != c or b != d. For example, (1, 2) and (2, 1) are distinct.
// Note that a pair (num1, num2) such that num1 == num2 can also be excellent if you have at least one occurrence of num1 in the array.


// Solution: Sum of Number of 1-bits 

// The key of the problem is that the sum of the number of 1-bits in both numbers is the number of bits for the OR & AND of the two numbers.
// A few examples to test this out (in binary): 
  // 11 10 -> 3 bits
  // 11 00 -> 2 bits
  // 00 10 -> 1 bit
  // 1111 0000 -> 4 bits
  // 1001 0010 -> 3 bits
  // 1100 0101 -> 4 bits

// Get the unique numbers in nums and sort them in asc order.
// Keep track of count, where count[i] = the number of numbers with exactly i 1-bits.
// For each number, loop through the numbers of bits and count the number of pairs where the sum of the bits >= k.

// Time Complexity: O(n log(n)) 432ms
// Space Complexity: O(n) 87.1MB
var countExcellentPairs = function(nums, k) {
  let count = Array(33).fill(0);
  nums = [...new Set(nums)].sort((a, b) => a - b);
  let ans = 0, n = nums.length;
  for (let i = 0; i < n; i++) {
    let bits = getOneBits(nums[i]);
    if (bits + bits >= k) ans++;
    for (let j = Math.max(1, k - bits); j < 33; j++) {
      if (bits + j >= k) {
        ans += (count[j] * 2);
      }
    }
    count[bits]++;
  }
  return ans;
  
  function getOneBits(num) {
    let count = 0;
    while (num > 0) {
      count += (num & 1);
      num >>= 1;
    }
    return count;
  }
};

// Two test cases
console.log(countExcellentPairs([1,2,3,1], 3)) // 5
console.log(countExcellentPairs([5,1,1], 10)) // 0