// 1291. Sequential Digits
// An integer has sequential digits if and only if each digit in the number is one more than the previous digit.
// Return a sorted list of all the integers in the range [low, high] inclusive that have sequential digits.


// Solution: 

// Generate all the sequential numbers from the length of low to the length of high.
  // For example: low = 500, high = 5000
    // length = 3: 123, 234, 345, 456, 567, 678, 789 (then only take the numbers that are in range)
    // length = 4: 1234, 2345, 3456, 4567, 5678, 6789 (we only take the numbers up to 4567)

// Time Complexity: O(1) 130ms
// Space Complexity: O(1) 38.4MB
var sequentialDigits = function(low, high) {
  let res = [];
  let startLen = len(low), endLen = len(high);
  for (var length = startLen; length <= endLen; length++) { 
    for (var start = 1; start <= 10 - length; start++) {
      let num = +getStr(length, start);
      if (num < low) continue;
      if (num > high) break;
      res.push(num);
    }
  }
  return res;
  
  function len(num) { // returns the number of digits in a number
    let count = 0;
    while (num > 0) {
      count++;
      num = Math.floor(num / 10);
    }
    return count;
  }
  
  // returns the sequential string number according to the parameters
  // if len = 3, startDigit = 4, result will be: "456"
  function getStr(len, startDigit) { 
    let str = "";
    for (var i = startDigit; i < startDigit + len; i++) {
      str += i;
    }
    return str;
  }
};

// Two test cases to run function on
console.log(sequentialDigits(100, 300)) // [123,234]
console.log(sequentialDigits(1000, 13000)) // [1234,2345,3456,4567,5678,6789,12345]