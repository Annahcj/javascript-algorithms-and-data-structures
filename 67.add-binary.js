// 67. Add Binary
// Given two binary strings a and b, return their sum as a binary string.


// Solution: Digit by Digit

// Logic:
// Start from the ends of a and b, keep a 'carry' variable, and calculate digit by digit.

// Set carry to 0, ans (answer) to an empty string.
// Set i (pointer for a) to the length of a - 1, j (pointer for b) to the length of b - 1.
// Loop while either i is bigger than or equal to 0 OR j is bigger than or equal to 0  *
  // (if the lengths of a and b are not the same, we can simply set the first digit to 0)
  // num1 = a[i] (turn into number) OR 0 (if a[i] is undefined)
  // num2 = b[j] (number) or 0 (if b[j] is undefined)
  // let sum be num1 + num2 + carry
  // let keep (amount to add to ans) be sum modular 2 (0: 0, 1: 1, 2: 0, 3: 1)
  // if sum is bigger than 1, set carry to 1, otherwise 0.
  // add keep to the front of ans
  // decrement i and j by one.
// *
// If carry is bigger than 0, add 1 to the front of ans.
// Return ans.

// Time Complexity: O(Math.max(a.length, b.length)) 88ms
// Space Complexity: O(1) 40.3MB 
  var addBinary = function(a, b) {
    let carry = 0, ans = '';
    let i = a.length - 1, j = b.length - 1; 
    while (i >= 0 || j >= 0) {
      let num1 = +a[i] || 0;
      let num2 = +b[j] || 0;
      let sum = num1 + num2 + carry;
      let keep = sum % 2;
      carry = sum > 1 ? 1 : 0;
      ans = `${keep}${ans}`;
      i--, j--;
    }
    if (carry > 0) ans = `1${ans}`;
    return ans;
  };
  
  // Three test cases to run function on
  console.log(addBinary("11", "11")) // "110"
  console.log(addBinary("11", "1")) // "100"
  console.log(addBinary("1010", "1011")) // "10101"