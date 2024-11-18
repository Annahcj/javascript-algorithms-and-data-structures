// 1652. Defuse the Bomb
// You have a bomb to defuse, and your time is running out! Your informer will provide you with a circular array code of length of n and a key k.
// To decrypt the code, you must replace every number. All the numbers are replaced simultaneously.
  // If k > 0, replace the ith number with the sum of the next k numbers.
  // If k < 0, replace the ith number with the sum of the previous k numbers.
  // If k == 0, replace the ith number with 0.
// As code is circular, the next element of code[n-1] is code[0], and the previous element of code[0] is code[n-1].
// Given the circular array code and an integer key k, return the decrypted code to defuse the bomb!


// Solution: Sliding Window

// Use a sliding window of length abs(k) to find the sum in each window.
// decoded[i] = sum of window of size abs(k) starting from (if k > 0) or ending at (if k < 0) index i.

// Time Complexity: O(n + k) 0ms
// Space Complexity: O(n) 49.7MB
function decrypt(code, k) {
  let n = code.length;
  if (k === 0) return Array(n).fill(0);
  let decoded = Array(n), currSum = 0;
  let size = Math.abs(k);
  for (let i = 0; i < n + size - 1; i++) {
    currSum += code[i % n];
    if (i >= size) {
      currSum -= code[i - size];
    }
    if (i >= size - 1) {
      // for k > 0, (i - size + n) % n is the start index of the window - 1
      // for k < 0, (i + 1) % n is the end index of the window + 1
      decoded[k > 0 ? (i - size + n) % n : (i + 1) % n] = currSum;
    }
  }
  return decoded;
};

// Three test cases
console.log(decrypt([5,7,1,4], 3)) // [12,10,16,13]
console.log(decrypt([1,2,3,4], 0)) // [0,0,0,0]
console.log(decrypt([2,4,9,3], -2)) // [12,5,6,13]