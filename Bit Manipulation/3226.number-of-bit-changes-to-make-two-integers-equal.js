// 3226. Number of Bit Changes to Make Two Integers Equal
// You are given two positive integers n and k.
// You can choose any bit in the binary representation of n that is equal to 1 and change it to 0.
// Return the number of changes needed to make n equal to k. If it is impossible, return -1.


// Solution: Bit Manipulation

// Go through each bit and compare the bits at n and k.
// If n has a 1-bit and k has a 0-bit, then we can change it to 0.
// But if n has a 0-bit and k has a 1-bit, then it's impossible.

// Time Complexity: O(log(n)) 61ms
// Space Complexity: O(1) 49.7MB
function minChanges(n, k) {
  let changes = 0;
  for (let i = 0; i < 20; i++) {
    let bitN = (n >> i) & 1;
    let bitK = (k >> i) & 1;
    if (bitN === 1 && bitK === 0) {
      changes++;
    } else if (bitN === 0 && bitK === 1) {
      return -1;
    }
  } 
  return changes;
};

// Three test cases
console.log(minChanges(13, 4)) // 2
console.log(minChanges(21, 21)) // 0
console.log(minChanges(14, 13)) // -1