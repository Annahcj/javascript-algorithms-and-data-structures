// 171. Excel Sheet Column Number
// Given a string columnTitle that represents the column title as appear in an Excel sheet, return its corresponding column number.


// Solution: Base 26

// A = 26
// AB = 28 -> (26^1 * 1) + (26^0 * 2)
// AAB = 704 = (26^2 * 1) + (26^1 * 1) + (26^0 * 2)

// This can be simplified to multiplying by 26 for each digit, then adding the character code - 64.

// Time Complexity: O(n) 114ms
// Space Complexity: O(1) 43.7MB
var titleToNumber = function(columnTitle) {
  let ans = 0, n = columnTitle.length;
  for (let i = 0; i < n; i++) {
    let charCode = columnTitle.charCodeAt(i) - 64;
    ans = ans * 26 + charCode;
  }
  return ans;
};

// Three test cases to run function on
console.log(titleToNumber("A")) // 1
console.log(titleToNumber("AB")) // 28
console.log(titleToNumber("AAB")) // 704