// 1888. Minimum Number of Flips to Make the Binary String Alternating
// You are given a binary string s. You are allowed to perform two types of operations on the string in any sequence:
  // Type-1: Remove the character at the start of the string s and append it to the end of the string.
  // Type-2: Pick any character in s and flip its value, i.e., if its value is '0' it becomes '1' and vice-versa.
// Return the minimum number of type-2 operations you need to perform such that s becomes alternating.
// The string is called alternating if no two adjacent characters are equal.
  // For example, the strings "010" and "1010" are alternating, while the string "0100" is not.


// Solution: Counting

// count = number of flips needed to turn s into 010101...
// n - count = number of matches to turn s into 101010...
// (the counts to turn s into 101010 and 010101 are the inverse of each other)

// Try shifting each s[i] from the start to the end and record the minimum number of flips needed.

// Shift each s[i] from position 0 to position n-1:
  // 1. Subtract the count of removing s[i] from position 0 (if s[i] === '1', subtract 1, otherwise 0)
  // 2. Flip the count. Since the count is for the remaining n-1 characters, the flip = (n - 1 - count).
    // Since we will have the inverse sequence count left over (010101... instead of 101010...), flip it to become 10101...
  // 3. Add the count of adding s[i] to position n - 1.

// Record the minimum count out of all count and n - count.

// Time Complexity: O(n) 122ms
// Space Complexity: O(1) 47MB
var minFlips = function(s) {
  let count = 0, n = s.length;
  for (let i = 0; i < n; i++) {
    if (i % 2 === 0) {
      count += s[i] === '1' ? 1 : 0;
    } else {
      count += s[i] === '0' ? 1 : 0;
    }
  }
  
  let ans = Infinity;
  for (let i = 0; i < n; i++) {
    ans = Math.min(ans, count, n - count);
    count -= (s[i] === '1' ? 1 : 0);
    count = n - 1 - count;
    if (n % 2 === 0 && s[i] === '0') count++;
    if (n % 2 === 1 && s[i] === '1') count++;
  }
  return ans;
};

// Three test cases to run function on
console.log(minFlips("111000")) // 2
console.log(minFlips("010")) // 0
console.log(minFlips("1110")) // 1