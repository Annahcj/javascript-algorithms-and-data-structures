// 2376. Count Special Integers
// We call a positive integer special if all of its digits are distinct.
// Given a positive integer n, return the number of special integers that belong to the interval [1, n].

 
// Solution: DP w/ Bitmasks

// Count the number of permutations for numbers with less digits than in n.
  // The formula is 9 * 9 * 8 * 7 * 6 * ...
  // The first digit is 9 because we don't count leading zeros.
  // For each permutation, we get one less choice than in the previous digit because the digits should be distinct.

// For the numbers with an equal numbers of digits as n,
// Memoize each dp(i, mask, isGreater), where
  // i = ith digit
  // mask = bitmask which indicates which digits have been used
  // isSmaller = (0 or 1) whether current number is tracking smaller than or equal to n so far.
    // In other words, when digits are smaller than the digits in n earlier on, that means we can use any digits later even though they are greater than n[index].

// d = number of digits in n
// Time Complexity: O(d * 2^10) 190ms
// Space Complexity: O(d * 2^10) 49.2MB
var countSpecialNumbers = function(n) {
  let str = n.toString(), size = str.length;
  let numMasks = 2 ** 10; // unique digits 1-9
  let memo = Array(size).fill(0).map(() => Array(numMasks).fill(0).map(() => Array(2).fill(-1)));
  let count = dp(0, 0, 0); // equal amount of digits as n
  for (let i = 1; i < size; i++) {
    count += getCount(i);
  }
  return count;
  
  function dp(i, mask, isSmaller) {
    if (i === size) return 1;
    if (memo[i][mask][isSmaller] !== -1) return memo[i][mask][isSmaller];
    let ans = 0;
    for (let digit = 0; digit <= 9; digit++) {
      if (i === 0 && digit === 0) continue; // can't have leading zeros
      if ((mask >> digit) & 1) continue; // digit has already been used
      let newMask = mask | (1 << digit);
      if (digit < Number(str[i])) {
        ans += dp(i + 1, newMask, 1);
      } else if (digit === Number(str[i])) {
        ans += dp(i + 1, newMask, isSmaller);
      } else if (isSmaller === 1) {
        ans += dp(i + 1, newMask, 1);
      }
    }
    return memo[i][mask][isSmaller] = ans;
  }
  
  function getCount(n) {
    let ans = 9; 
    for (let i = 9; i >= 0; i--) {
      if (10 - i >= n) break;
      ans *= i;
    }
    return ans;
  }
};

// Two test cases to run function on
console.log(countSpecialNumbers(111)) // 98
console.log(countSpecialNumbers(135)) // 110