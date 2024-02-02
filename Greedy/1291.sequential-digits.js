// 1291. Sequential Digits
// An integer has sequential digits if and only if each digit in the number is one more than the previous digit.
// Return a sorted list of all the integers in the range [low, high] inclusive that have sequential digits.


// Solution: Greedy

// There are a limited amount of sequential numbers.
// All the possible starting positions are 1-9, 
// and from there we build up the number by adding digits one more than the previous digit, until it exceeds `high`.
// The maximum number of iterations is: 100 (10 starting digits, and each sequence can have at most 10 digits).

// Time Complexity: O(100) = O(1) 51ms
// Space Complexity: O(100) = O(1) 49.1MB
var sequentialDigits = function(low, high) {
  let sequential = [];
  for (let i = 1; i <= 9; i++) {
    let num = i;
    while (num <= high) {
      if (num >= low) sequential.push(num);
      
      let lastDigit = num % 10;
      if (lastDigit === 9) break;
      num = num * 10 + (lastDigit + 1);
    }
  }  
  return sequential.sort((a, b) => a - b);
};

// Two test cases 
console.log(sequentialDigits(100, 300)) // [123,234]
console.log(sequentialDigits(1000, 13000)) // [1234,2345,3456,4567,5678,6789,12345]