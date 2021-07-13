// 17. Letter Combinations of a Phone Number
// Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

// Solution 1: Backtracking
// Map all letters to their corresponding numbers in a hashmap.
// Create a recursive 'backtrack' function.
  // This accepts an array and an index as params
  // Until the length of the array is equal to the length of digits, we keep looping through all letters mapped to digit at index,
  // for each, we push into array, call backtrack with arr and index + 1, then pop off the last digit.
  // When a complete combination is reached, we push it into our result array, then return from the recursive call.
// Call the backtrack function for an empty array and index of 0.

// Time Complexity: O(4^n * n) 76ms
// Space Complexity: O(n) (maximum recursion depth is 4) 38.8MB
var letterCombinations = function(digits) {
    if (!digits.length) return [];
    let buttons = {
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
    backTrack([], 0);
    function backTrack(arr, index) {
      if (digits.length === arr.length) {
        combinations.push(arr.join(""));
        return;
      }
      buttons[digits[index]].forEach(comb => {
        arr.push(comb);
        backTrack(arr, index + 1);
        arr.pop();
      });
    }
    return combinations;
  };
  
  // Three test cases to run function on
  console.log(letterCombinations("23")) // ["ad","ae","af","bd","be","bf","cd","ce","cf"]
  console.log(letterCombinations("")) // []
  console.log(letterCombinations("2")) // ["a","b","c"]