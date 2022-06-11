// 1307. Verbal Arithmetic Puzzle
// Given an equation, represented by words on the left side and the result on the right side.
// You need to check if the equation is solvable under the following rules:
  // Each character is decoded as one digit (0 - 9).
  // Every pair of different characters must map to different digits.
  // Each words[i] and result are decoded as one number without leading zeros.
  // Sum of numbers on the left side (words) will equal to the number on the right side (result).
// Return true if the equation is solvable, otherwise return false.


// Solution: Backtracking

// e.g: ["SEND", "MORE"], "MONEY"
// If we set letter E to 2, the total will be: 200 + 2 - 20.
// +200 for SEND, since E is in position 2 (from the right).
// +2 for MORE, since E is in position 0.
// -20 for MONEY (result), since E is in position 1.

// We can do this for every unique character in each word and result, use backtracking to try out each digit (0-9) for each character.

// 1. Go through the words and result and get the following information:
  // a. chars -> Each unique character
  // b. isFirst -> Characters that exist as a first character but not the only character (case for leading zeros)
  // c. leftPow -> the powers of ten of each character in words
    // e.g: words = ["DAB","ABC"], leftPow[a] = 110 (DAB -> A in position 1 -> 10, ABC: A in position 2 -> 100)
    // from here, we can multiply the leftPow[char] by the digit we are currently taking.
  // d. rightPow -> the powers of ten of each character in result
// 2. Use backtracking to try assign each digit to each unique character.
  // Keep track of digits that we have already used.
  // Account for the case of leading zeros using the isFirst array that we populated in the beginning.

// n = unique characters in words and result, d = number of digits
// Time Complexity: O(d^n) loose bound 2643ms
// Space Complexity: O(n) 45.2MB
var isSolvable = function(words, result) {
  let chars = new Set(), isFirst = Array(26).fill(0); // isFirst[i] is 1 if character i is the first character in any word or in result
  let leftPow = Array(26).fill(0), rightPow = Array(26).fill(0);
  for (let word of words) {
    if (word.length > result.length) return false;
    for (let i = 0; i < word.length; i++) {
      chars.add(word[i]);
      leftPow[word.charCodeAt(i) - 65] += 10 ** (word.length - i - 1);
    }
    isFirst[word.charCodeAt(0) - 65] = word.length > 1 ? 1 : 0;
  }
  for (let i = 0; i < result.length; i++) {
    chars.add(result[i]);
    rightPow[result.charCodeAt(i) - 65] += 10 ** (result.length - i - 1);
  }
  isFirst[result.charCodeAt(0) - 65] = result.length > 1 ? 1 : 0;
  chars = [...chars];
  
  let used = Array(10).fill(0), n = chars.length;
  return backtrack(0, 0);
  
  function backtrack(index, bal) { // index in chars, balance of words and result
    if (index === n) return bal === 0;

    let currCharCode = chars[index].charCodeAt() - 65;
    for (let i = 0; i <= 9; i++) {
      if (i === 0 && isFirst[currCharCode]) continue; // leading zero
      if (used[i]) continue; 
      used[i] = 1;
      let leftAdd = leftPow[currCharCode] * i;
      let rightAdd = rightPow[currCharCode] * i;
      if (backtrack(index + 1, bal + leftAdd - rightAdd)) return true;
      used[i] = 0;
    }
    return false;
  }
};

// Two test cases to run function on
console.log(isSolvable(["SEND","MORE"], "MONEY")) // true
console.log(isSolvable(["LEET","CODE"], "POINT")) // false