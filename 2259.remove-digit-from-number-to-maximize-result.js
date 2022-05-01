// 2259. Remove Digit From Number to Maximize Result
// You are given a string number representing a positive integer and a character digit.
// Return the resulting string after removing exactly one occurrence of digit from number such that the value of the resulting string in decimal form is maximized. The test cases are generated such that digit occurs at least once in number.


// Solution: Greedy

// It is optimal to remove the leftmost occurance of digit where number[i + 1] > digit.
// If there is no occurance where number[i + 1] > digit, the least damage we can make is by removing the rightmost occurance of digit.
// This is because by this point, we know that removing any occurance of the digit will create a smaller number, 
  // so removing it in the most insignificant place is the best choice.

// Time Complexity: O(n) 75ms
// Space Complexity: O(n) 41.9MB
var removeDigit = function(number, digit) {
  for (let i = 0; i < number.length; i++) {
    if (number[i] !== digit) continue;
    if (i === number.length - 1 || number[i] < number[i + 1]) {
      return number.slice(0, i) + number.slice(i + 1);
    }
  }
  let lastIdx = number.lastIndexOf(digit);
  return number.slice(0, lastIdx) + number.slice(lastIdx + 1);
};

// Two test cases to run function on
console.log(removeDigit("123", "3")) // "12"
console.log(removeDigit("551", "5")) // "51"