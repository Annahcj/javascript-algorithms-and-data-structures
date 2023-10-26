// 848. Shifting Letters
// You are given a string s of lowercase English letters and an integer array shifts of the same length.
// Call the shift() of a letter, the next letter in the alphabet, (wrapping around so that 'z' becomes 'a').
// For example, shift('a') = 'b', shift('t') = 'u', and shift('z') = 'a'.
// Now for each shifts[i] = x, we want to shift the first i + 1 letters of s, x times.
// Return the final string after all such shifts to s are applied.


// Solution: Prefix Sum / Cumulative Sum

// Update shifts -> loop from right to left, updating shifts[i] to be (shifts[i] + shifts[i + 1]) % 26
// Build up final string -> loop from left to right, 
  // get the character code -> (charCodeAt of s[i] - 97 + shifts[i]) % 26
  // append String.fromCharCode(code + 97) to ans
// Return ans

// Time Complexity: O(n) 147ms
// Space Complexity: O(n) 60.9MB
var shiftingLetters = function(s, shifts) {
  let n = shifts.length, ans = '';
  for (let i = n - 2; i >= 0; i--) {
    shifts[i] = (shifts[i] + shifts[i + 1]) % 26;
  }
  for (let i = 0; i < n; i++) {
    let code = (s.charCodeAt(i) - 97 + shifts[i]) % 26;
    ans += String.fromCharCode(code + 97);
  }
  return ans;
};

// Two test cases 
console.log(shiftingLetters("abc", [3,5,9])) // "rpl"
console.log(shiftingLetters("aaa", [1,2,3])) // "gfd"