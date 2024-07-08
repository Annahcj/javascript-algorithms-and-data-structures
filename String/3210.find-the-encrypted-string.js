// 3210. Find the Encrypted String
// You are given a string s and an integer k. Encrypt the string using the following algorithm:
  // For each character c in s, replace c with the kth character after c in the string (in a cyclic manner).
// Return the encrypted string.


// Solution: 

// Build up a new string, where each newStr[i] = s[(i + k) % n].

// Time Complexity: O(n) 62ms
// Space Complexity: O(n) 51.8MB
function getEncryptedString(s, k) {
  let encrypted = s.split(""), n = s.length;
  for (let i = 0; i < n; i++) {
    encrypted[i] = s[(i + k) % n];
  }
  return encrypted.join("");
};

// Two test cases
console.log(getEncryptedString("dart", 3)) // "tdar"
console.log(getEncryptedString("aaa", 1)) // "aaa"