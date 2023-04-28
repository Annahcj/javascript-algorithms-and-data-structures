// 1529. Minimum Suffix Flips
// You are given a 0-indexed binary string target of length n. You have another binary string s of length n that is initially set to all zeros. You want to make s equal to target.
// In one operation, you can pick an index i where 0 <= i < n and flip all bits in the inclusive range [i, n - 1]. Flip means changing '0' to '1' and '1' to '0'.
// Return the minimum number of operations needed to make s equal to target.


// Solution: Greedy Logic

// Count the number of consecutive groups of 1's or 0's.
// Note: If the first group is 0's, then we don't need to flip the first group.

// Think of it as flipping each group from right to left.
// e.g: target = "110111"
// Initial: "000000"
// Flip 1:  "000111" (flip last 3 digits for group "111")
// Flip 2:  "001000" (flip last 4 digits for group "0")
// Flip 3:  "110111" (flip all digits for group "11")

// Time Complexity: O(n) 68ms
// Space Complexity: O(1) 44.5MB
var minFlips = function(target) {
  let n = target.length, groups = 1;
  for (let i = 1; i < n; i++) {
    if (target[i] !== target[i - 1]) groups++;
  }
  return target[0] === "0" ? groups - 1 : groups;
};

// Three test cases
console.log(minFlips("10111")) // 3
console.log(minFlips("101")) // 3
console.log(minFlips("00000")) // 0