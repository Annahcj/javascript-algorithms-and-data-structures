// 1963. Minimum Number of Swaps to Make the String Balanced
// ou are given a 0-indexed string s of even length n. The string consists of exactly n / 2 opening brackets '[' and n / 2 closing brackets ']'.
// A string is called balanced if and only if:
// It is the empty string, or
// It can be written as AB, where both A and B are balanced strings, or
// It can be written as [C], where C is a balanced string.
// You may swap the brackets at any two indices any number of times.
// Return the minimum number of swaps to make s balanced.


// Solution: Brute Force

// Split s into an array so that we can swap the brackets.
// Loop through s and store the indexes of each opening bracket in an array 'idxs'
// Keep a balance counter 'bal' which indicates whether the string is balanced up to the current index.
// Loop through s (pointer = j) 
  // If s[j] is a closing bracket, decrement bal by one.
  // If s[j] is an opening bracket, increment bal by one.
  // If bal is smaller than 0 (unbalanced)
    // Increment swaps counter
    // (Swap the last opening bracket with the current closing bracket)
    // Pop the last idx of idxs (the last opening bracket) and save it in a variable 'idx'
    // Swap s[j] with s[idx]
    // Increment bal by two (because s[j] is closing bracket, diff between closing bracket and opening bracket is two)
// Return swaps counter

// Time Complexity: O(n) splitting - O(n), count of brackets - O(n), looping through s - O(n). 228ms
// Space Complexity: O(n / 2) (indexes of the opening brackets) 88.8MB
var minSwaps = function (s) {
  s = s.split("");
  let idxs = [], swaps = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '[') {
      idxs.push(i);
    }
  }
  let bal = 0;
  for (let j = 0; j < s.length; j++) {
    if (s[j] === ']') bal--;
    if (s[j] === '[') bal++;
    if (bal < 0) {
      let idx = idxs.pop();
      let temp = s[j];
      s[j] = s[idx];
      s[idx] = temp;
      swaps++;
      bal += 2;
    }
  }
  return swaps;
};

// Three test cases
console.log(minSwaps("][][")) // 1
console.log(minSwaps("]]][[[")) // 2
console.log(minSwaps("[]")) // 0