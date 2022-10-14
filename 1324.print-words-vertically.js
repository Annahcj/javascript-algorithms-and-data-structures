// 1324. Print Words Vertically
// Given a string s. Return all the words vertically in the same order in which they appear in s.
// Words are returned as a list of strings, complete with spaces when is necessary. (Trailing spaces are not allowed).
// Each word would be put on only one column and that in one column there will be only one word.


// Solution: Simulation

// Let n = the number of words in s, and m = the maximum length of a word.
// Create a matrix "res" of size m x n.
// Each s[i] should be placed in position res[index of character in current word][index of current word in s]

// 1. Get the number of words and the maximum length of a word.
// 2. Create matrix of size m x n.
// 3. Populate the matrix while keeping track of the current character index and word index.
// 4. Remove trailing spaces from each row in the matrix.
// 5. Join each row together into a string.

// n = number of words, m = max length of a word
// Time Complexity: O(nm) 98ms
// Space Complexity: O(nm) 41.7MB
var printVertically = function(s) {
  let length = 0, maxLength = 0, words = 0;
  for (let char of s) {
    if (char === ' ') length = 0;
    else {
      if (length === 0) words++;
      length++;
      maxLength = Math.max(maxLength, length);
    }
  }
  
  let n = s.length, res = Array(maxLength).fill(0).map(() => Array(words).fill(" "));
  let wordIndex = 0;
  length = 0;
  for (let i = 0; i < n; i++) {
    if (s[i] === ' ') length = 0;
    else {
      if (length === 0) wordIndex++;
      res[length][wordIndex - 1] = s[i];
      length++;
    }
  }
  
  for (let row of res) {
    while (row.length && row[row.length - 1] === ' ') row.pop();
  }
  return res.map((row) => row.join(""));
};

// Three test cases
console.log(printVertically("HOW ARE YOU")) // ["HAY","ORO","WEU"]
console.log(printVertically("TO BE OR NOT TO BE")) // ["TBONTB","OEROOE","   T"]
console.log(printVertically("CONTEST IS COMING")) // ["CIC","OSO","N M","T I","E N","S G","T"]