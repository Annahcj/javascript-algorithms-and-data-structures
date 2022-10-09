// 2433. Find The Original Array of Prefix Xor
// You are given an integer array pref of size n. Find and return the array arr of size n that satisfies:
  // pref[i] = arr[0] ^ arr[1] ^ ... ^ arr[i].
// Note that ^ denotes the bitwise-xor operation.
// It can be proven that the answer is unique.


// Solution: XOR

// For each pref[i], we need to find the number where pref[i - 1] ^ ? = pref[i].
// Compare individual bits of pref[i - 1] and pref[i]:
  // If the bits are the same, we must take bit 0.
  // If the bits are different, we must take bit 1.
  
// Notice that the bits we need to take are actually the same as the result of XORing them together.
  // 1 ^ 1 = 0
  // 0 ^ 0 = 0
  // 1 ^ 0 = 1
  // 0 ^ 1 = 1

// Therefore, we can XOR each pref[i - 1] and pref[i] to get the answers.

// Time Complexity: O(n) 229ms
// Space Complexity: O(1) (not including output) 74.2MB
var findArray = function(pref) {
  let n = pref.length, res = Array(n);
  res[0] = pref[0];
  for (let i = 1; i < n; i++) {
    res[i] = pref[i - 1] ^ pref[i];
  }
  return res;
};

// Two test cases
console.log(findArray([5,2,0,3,1])) // [5,7,2,3,2]
console.log(findArray([13])) // [13]