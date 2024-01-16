// 3007. Maximum Number That Sum of the Prices Is Less Than or Equal to K
// You are given an integer k and an integer x.
// Consider s is the 1-indexed binary representation of an integer num. The price of a number num is the number of i's such that i % x == 0 and s[i] is a set bit.
// Return the greatest integer num such that the sum of prices of all numbers from 1 to num is less than or equal to k.
// Note:
  // In the binary representation of a number set bit is a bit of value 1.
  // The binary representation of a number will be indexed from right to left. For example, if s == 11100, s[4] == 1 and s[2] == 0.
 

// Solution: Binary Search & Bit Manipulation

// Binary search for the maximum num where the sum of prices from 1 to num <= k.
// The upper bound can be set to 10^15, as this is the smallest integer where the sum of prices over all positions are greater than 10^15.
// First, find the bit positions (position from right to left, 1-indexed) where position % x === 0.

// Notice the pattern for each position (credit to @darkhood70):
// Each position has 0's and 1's grouped together in groups of 2^(position-1): (2^(position-1) 0's, 2^(position-1) 1's, and alternating...)

  //      4   3   2   1   --> bit positions
  //    +---+---+---+---+
  //    | 0 | 0 | 0 | 0 | --> 0
  //    +---+---+---+---+
  //    | 0 | 0 | 0 | 1 | --> 1
  //    +---+---+---+---+ 
  //    | 0 | 0 | 1 | 0 | --> 2
  //    +---+---+---+---+ 
  //    | 0 | 0 | 1 | 1 | --> 3
  //    +---+---+---+---+ 
  //    | 0 | 1 | 0 | 0 | --> 4
  //    +---+---+---+---+
  //    | 0 | 1 | 0 | 1 | --> 5
  //    +---+---+---+---+ 
  //    | 0 | 1 | 1 | 0 | --> 6
  //    +---+---+---+---+ 
  //    | 0 | 1 | 1 | 1 | --> 7
  //    +---+---+---+---+ 
  //    | 1 | 0 | 0 | 0 | --> 8
  //    +---+---+---+---+ 
  //    | 1 | 0 | 0 | 1 | --> 9
  //    +---+---+---+---+ 
  //    | 1 | 0 | 1 | 0 | --> 10
  //    +---+---+---+---+ 
  //    | 1 | 0 | 1 | 1 | --> 11
  //    +---+---+---+---+ 
  //    | 1 | 1 | 0 | 0 | --> 12
  //    +---+---+---+---+
  //    | 1 | 1 | 0 | 1 | --> 13         
  //    +---+---+---+---+ 
  //    | 1 | 1 | 1 | 0 | --> 14
  //    +---+---+---+---+
  //    | 1 | 1 | 1 | 1 | --> 15
  //    +---+---+---+---+

// 1. Find the number of full groups (0's + 1's, size 2^(position-1) + 2^(position-1)) within the range (1, ..., num).
  // Full groups: Math.floor((num + 1) / (2^(position-1) + 2^(position-1)))
  // Divide the full groups by 2 to get the number of 1's.
// 2. Find the number of 1's in the last group (can be partial).
  // Size of last group: (num + 1) % (2^(position-1) + 2^(position-1))
  // Number of ones in last group: Size of last group - 2^(position - 1).

// Time Compleity: O(log(10^15)) 99ms
// Space Complexity: O(1) 44.4MB
var findMaximumNumber = function(k, x) {
  let low = 1, high = 10 ** 15;
  while (low < high) {
    let mid = low + Math.ceil((high - low) / 2);
    if (sumPrices(mid, x) <= k) low = mid;
    else high = mid - 1;
  }
  return low;
};

function sumPrices(num, x) {
  let leftmostSetBit = Math.floor(Math.log2(num));
  let sum = 0;
  for (let position = x; position - 1 <= leftmostSetBit; position += x) {
    let fullGroupSize = (2 ** (position - 1)) * 2;
    let fullGroups = Math.floor((num + 1) / fullGroupSize);
    let onesInFullGroups = fullGroups * (fullGroupSize / 2);
    let onesInLastGroup = Math.max(0, ((num + 1) % fullGroupSize) - (fullGroupSize / 2));
    sum += onesInFullGroups + onesInLastGroup;
  }
  return sum;
}

// Two test cases
console.log(findMaximumNumber(9, 1)) // 6
console.log(findMaximumNumber(7, 2)) // 9