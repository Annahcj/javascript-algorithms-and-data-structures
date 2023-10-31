// 2278. Percentage of Letter in String
// Given a string s and a character letter, return the percentage of characters in s that equal letter rounded down to the nearest whole percent.


// Solution: Count

// Count the number of characters in s equal to letter.
// Divide the count by s.length and multiply by 100 to get the percentage.

// Time Complexity: O(n) 66ms
// Space Complexity: O(1) 42.4MB
var percentageLetter = function(s, letter) {
  let count = 0;
  for (let char of s) {
    count += char === letter ? 1 : 0;
  }
  return Math.floor((count / s.length) * 100);
};

// Two test cases
console.log(percentageLetter("foobar", "o")) // 33
console.log(percentageLetter("jjjj", "k")) // 0