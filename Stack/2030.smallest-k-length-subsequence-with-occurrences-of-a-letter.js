// 2030. Smallest K-Length Subsequence With Occurrences of a Letter
// You are given a string s, an integer k, a letter letter, and an integer repetition.
// Return the lexicographically smallest subsequence of s of length k that has the letter letter appear at least repetition times. The test cases are generated so that the letter appears in s at least repetition times.
// A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.
// A string a is lexicographically smaller than a string b if in the first position where a and b differ, string a has a letter that appears earlier in the alphabet than the corresponding letter in b.


// Solution: Stack

// Count number of occurances of letter in s -> letterCount
// keep a stack

// Loop through s (pointer = i)
  // loop while
    // 1. stack is not empty
    // 2. last character of stack is lexographically bigger than s[i]
    // 3. we have enough characters to create k length subsequence -> remaining letters (incl s[i]) + curr stack length is bigger than k 
    // 4. if last char of stack is not equal to letter OR letterCount is bigger than repetition
    // if all these conditions are true, pop from the stack, if it was a letter, increment repetition by one

  // (now we push in a new character)
  // if length of stack is smaller than k (if stack length is equal to k, that means we weren't able to pop anything out, meaning our answer is set)
    // if s[i] is equal to letter
      // push s[i] into stack
      // decrement repetition by one
    // otherwise if remaining number of non-letter characters we need to put are bigger than 0
      // push s[i] into stack
  // if s[i] is equal to letter, decrement letterCount by one

// build up the final result string from the stack and return it

// Time Complexity: O(n) 310ms
// Space Complexity: O(k) 62.2MB
var smallestSubsequence = function(s, k, letter, repetition) {
  let letterCount = 0;
  for (let char of s) if (char === letter) letterCount++;
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    while (stack.length && stack[stack.length - 1] > s[i] && ((s.length - i + stack.length) > k) && (stack[stack.length - 1] !== letter || letterCount > repetition)) {
      let lastChar = stack.pop();
      if (lastChar === letter) repetition++;
    }
    if (stack.length < k) {
      if (s[i] === letter) {
        stack.push(s[i]);
        repetition--;
      } else if (k - stack.length - repetition) {
        stack.push(s[i]);
      }
    }
    if (s[i] === letter) letterCount--;
  }
  
  let res = "";
  for (let char of stack) res += char;
  return res;
};

// Three test cases
console.log(smallestSubsequence("leet", 3, "e", 1)) // "eet"
console.log(smallestSubsequence("leetcode", 4, "e", 2)) // "ecde"
console.log(smallestSubsequence("bb", 2, "b", 2)) // "bb"