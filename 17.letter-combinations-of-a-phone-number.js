// 17. Letter Combinations of a Phone Number
// Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

// Solution: Backtracking

// Use backtracking to find each combination.
// For each backtrack(index, comb), go through each letter for the ith digit and add it as the next letter in the current string.

// n = length of digits
// Time Complexity: O(4^n) 51ms
// Space Complexity: O(n) (max recursive depth is 4) 41.8MB
var letterCombinations = function(digits) {
  if (!digits.length) return [];
  let letters = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z']
  };
  let combinations = [];
  backtrack(0, []);
  return combinations;

  function backtrack(index, comb) {
    if (comb.length === digits.length) {
      combinations.push(comb.join(""));
      return;
    }
    for (let letter of letters[digits[index]]) {
      comb.push(letter);
      backtrack(index + 1, comb);
      comb.pop();
    }
  }
};

// Three test cases 
console.log(letterCombinations("23")) // ["ad","ae","af","bd","be","bf","cd","ce","cf"]
console.log(letterCombinations("")) // []
console.log(letterCombinations("2")) // ["a","b","c"]