// 600. Non-negative Integers without Consecutive Ones
// Given a positive integer n, return the number of the integers in the range [0, n] whose binary representations do not contain consecutive ones.


// Solution: Digit DP

// Memoize each dp(i, state, prevBit), where
  // i = the ith bit
  // state = whether the current number is tracking smaller, the same, or greater than n.
    // 0: smaller
    // 1: same
    // 2: greater
  // prevBit: the previous bit (we keep this so we can avoid adding consecutive 1's)

// Try each bit (0 or 1 if prevBit !== 1) as the next bit.
  // If bit < bits[index], set state to 0 (smaller) if it's currently 1 (equal).
  // If bit === bits[index], keep it to whatever state we currently have.  
  // If bit > bits[index], set state to 2 (bigger) if it's currently 1 (equal).

// Because adding 0-bits at the end becomes the same number, e.g: 11000 === 11000000, and 000100 === 001000000,
// we count the numbers right at the end, when all bits are present.

// k = number of bits in n (<= 32)
// Time Complexity: O(k * 3 * 2) = O(k) 128ms
// Space Complexity: O(k * 3 * 2) = O(k) 46.5MB
var findIntegers = function(n) {
  let bits = n.toString(2).toString(), size = bits.length;
  let memo = Array(size).fill(0).map(() => Array(3).fill(0).map(() => Array(2).fill(-1)));
  return dp(0, 1, 0);
  
  function dp(i, state, prevBit) {
    if (i === size) return state === 2 ? 0 : 1;
    if (memo[i][state][prevBit] !== -1) return memo[i][state][prevBit];
    
    let ans = 0, choices = prevBit === 1 ? [0] : [0, 1];
    for (let bit of choices) {
      if (bit < bits[i]) {
        ans += dp(i + 1, state === 1 ? 0 : state, bit);
      } else if (bit == bits[i]) {
        ans += dp(i + 1, state, bit);
      } else {
        ans += dp(i + 1, state === 1 ? 2 : state, bit);
      }
    }
    return memo[i][state][prevBit] = ans;
  }
};

// Three test cases to run function on
console.log(findIntegers(5)) // 5
console.log(findIntegers(1)) // 2
console.log(findIntegers(2)) // 3