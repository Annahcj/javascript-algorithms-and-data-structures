// 418. Sentence Screen Fitting
// Given a rows x cols screen and a sentence represented as a list of strings, return the number of times the given sentence can be fitted on the screen.
// The order of words in the sentence must remain unchanged, and a word cannot be split into two lines. A single space must separate two consecutive words in a line.


// Solution: Dynamic Programming

// Use dynamic programming to calculate the number of words that can fit on a row when sentence[i] is at the start.
// Use recursion and memoization to save some time/space by only computing the results we need.

// Time Complexity: O(n * cols + rows) 114ms
// Space Complexity: O(n) 42.9MB
var wordsTyping = function(sentence, rows, cols) {
  let n = sentence.length, memo = Array(n).fill(-1);
  let j = 0;
  for (let i = 0; i < rows; i++) {
    j += dp(j % n);
  }
  return Math.floor(j / n);
  
  function dp(idx) {
    let j = idx;
    if (memo[j] !== -1) return memo[j];
    let ans = 0, width = 0;
    while (width + sentence[j].length <= cols) {
      width += sentence[j].length + 1;
      j = (j + 1) % n;
      ans++;
    }
    return memo[idx] = ans;
  }
};

// Two test cases to run function on
console.log(wordsTyping(["hello","world"], 2, 8)) // 1
console.log(wordsTyping(["a", "bcd", "e"], 3, 6)) // 2