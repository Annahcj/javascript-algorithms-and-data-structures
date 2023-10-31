// 13. Roman to Integer
// Given a roman numeral, convert it to an integer.


// Solution: Checking Ahead

// We loop through the array, since special cases (e.g: 4 'IV', or 9 'IX') would only ever have a length of 2, we can do a check ahead to see if the value of the numeral ahead is bigger than the one behind.
    // If it is a special case, we add (num ahead - num behind) to our total sum. e.g: 'IV' -> (I = 1, V = 5), since 5 > 1, we add (5 - 1) to sum.
    // Otherwise, add value of the (num behind) to sum.
// Return sum.

// Time Complexity: O(n) 152ms
// Space Complexity: O(1) 44.3MB
var romanToInt = function(s) {
  let roman = {
    'I': 1, 
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
  };
  let sum = 0;
  for (let i = 0; i < s.length; i++) {
    let first = roman[s[i]], second = roman[s[i + 1]];
    if (first < second) {
      sum += second - first;
      i++;
    } else {
      sum += first;
    }
  }
  return sum;
};

// Three test cases
console.log(romanToInt("III")) // 3
console.log(romanToInt("IV")) // 4
console.log(romanToInt("IX")) // 9