// 2381. Shifting Letters II
// You are given a string s of lowercase English letters and a 2D integer array shifts where shifts[i] = [starti, endi, directioni]. For every i, shift the characters in s from the index starti to the index endi (inclusive) forward if directioni = 1, or shift the characters backward if directioni = 0.
// Shifting a character forward means replacing it with the next letter in the alphabet (wrapping around so that 'z' becomes 'a'). Similarly, shifting a character backward means replacing it with the previous letter in the alphabet (wrapping around so that 'a' becomes 'z').
// Return the final string after all such shifts to s are applied.


// Solution: Sweep Line

// Sweep line algorithm, keep track of the amount of change at each point.
// For each shift [start, end, direction],
  // count[start] += direction === 1 ? 1 : -1
  // count[end + 1] -= direction === 1 ? 1 : -1
// Then, get the cumulative sum. 
// The cumulative sum at each index will be the amount of characters we need to shift s[index].

// Note: To deal with negative sums, we need to modulo the sum by 26, then (charcode + shift + 26) % 26.
  // We need to add 26 to make it positive before applying modulo 26 again.

// n = length of s, m = number of shifts
// Time Complexity: O(n + m) 257ms
// Space Complexity: O(n) 72.9MB
var shiftingLetters = function(s, shifts) {
  let n = s.length, count = Array(n + 1).fill(0);  
  for (let [start, end, direction] of shifts) {
    count[start] += direction === 1 ? 1 : -1;
    count[end + 1] -= direction === 1 ? 1 : -1;
  }
  
  let sum = 0, res = "";
  for (let i = 0; i < n; i++) {
    sum += count[i];
    let shift = sum % 26;
    let charcode = s.charCodeAt(i) - 97;
    res += String.fromCharCode(((charcode + shift + 26) % 26) + 97);
  }
  return res;
};

// Two test cases
console.log(shiftingLetters("abc", [[0,1,0],[1,2,1],[0,2,1]])) // "ace"
console.log(shiftingLetters("dztz", [[0,0,0],[1,1,1]])) // "catz"