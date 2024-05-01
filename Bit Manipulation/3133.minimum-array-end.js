// 3133. Minimum Array End
// You are given two integers n and x. You have to construct an array of positive integers nums of size n where for every 0 <= i < n - 1, nums[i + 1] is greater than nums[i], and the result of the bitwise AND operation between all elements of nums is x.
// Return the minimum possible value of nums[n - 1].


// Solution: Bit Manipulation

// All numbers must have the same set bits as in x.
// Since every number must have those set bits, we can find all the bits that aren't set in x and treat them as if the set bits don't exist.
// Find the nth number made up by the un-set bits of x.
  // 1. Get the bit representation of n.
  // 2. Go through each set bit in the bit representation of n and flip the corresponding un-set bit.

// At the end, bitwise OR the final number with x.

// Time Complexity: O(log(n) + log(x)) 61ms
// Space Complexity: O(log(n) + log(x)) 54MB
var minEnd = function(n, x) {
  x = BigInt(x);
  let unsetBits = [];
  for (let i = 0; i < 63; i++) {
    if (!(x & (1n << BigInt(i)))) {
      unsetBits.push(i);
    }
  }
  let nthBitRepresentation = (n - 1).toString(2);
  let ans = 0n;
  for (let i = 0; i < nthBitRepresentation.length; i++) {
    if (nthBitRepresentation[nthBitRepresentation.length - i - 1] === '1') {
      let position = unsetBits[i];
      ans = ans | (1n << BigInt(position));
    }
  }
  return Number(x | ans);
};

// Two test cases
console.log(minEnd(3, 4)) // 6
console.log(minEnd(2, 7)) // 15