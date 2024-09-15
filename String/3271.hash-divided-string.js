// 3271. Hash Divided String
// You are given a string s of length n and an integer k, where n is a multiple of k. Your task is to hash the string s into a new string called result, which has a length of n / k.

// First, divide s into n / k substrings, each with a length of k. Then, initialize result as an empty string.
// For each substring in order from the beginning:
  // The hash value of a character is the index of that character in the English alphabet (e.g., 'a' → 0, 'b' → 1, ..., 'z' → 25).
  // Calculate the sum of all the hash values of the characters in the substring.
  // Find the remainder of this sum when divided by 26, which is called hashedChar.
  // Identify the character in the English lowercase alphabet that corresponds to hashedChar.
  // Append that character to the end of result.
// Return result.


// Solution: Simulation

// Build up the result according to the instructions, keeping track of a running sum of character codes and appending to the result when we reach the end of a substring (i % k === k - 1).

// Time Complexity: O(n) 86ms
  // Technically appending to a string is O(n), making the TC O(n^2), but in reality this is closer to O(n).
// Space Complexity: O(1) (excluding output) 52.7MB
function stringHash(s, k) {
  let n = s.length, res = "";
  let valueSum = 0;
  for (let i = 0; i < n; i++) {
    valueSum += s.charCodeAt(i) - 97;
    if (i % k === k - 1) { // end of substring
      let hashedChar = valueSum % 26;
      res += String.fromCharCode(hashedChar + 97);
      valueSum = 0;
    }
  }
  return res;
};

// Three test cases
console.log(stringHash("abcd", 2)) // "bf"
console.log(stringHash("mxz", 3)) // "i"