// 2094. Finding 3-Digit Even Numbers
// You are given an integer array digits, where each element is a digit. The array may contain duplicates.
// You need to find all the unique integers that follow the given requirements:
  // The integer consists of the concatenation of three elements from digits in any arbitrary order.
  // The integer does not have leading zeros.
  // The integer is even.
// For example, if the given digits were [1, 2, 3], integers 132 and 312 follow the requirements.
// Return a sorted array of the unique integers.


// Solution: Brute Force

// Get every combination of a 3-digit number, if the leading digit is not zero and it's divisible by two, add it to a set.
// Move the numbers from the set to an arr.
// Sort the array in asc order and return it.

// Time Complexity: O(n^3) 304ms
// Space Complexity: O(log(n)) (not including output. sorting takes O(log(n)) space) 41.4MB
var findEvenNumbers = function(digits) {
  let unique = new Set(), n = digits.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        if (i !== j && j !== k && k !== i) { // if the indices are not equal
          if (digits[i] === 0) continue; // skip leading zeros
          let num = digits[i] * 100 + digits[j] * 10 + digits[k];
          if (num % 2 === 0) unique.add(num); // if divisible by two, add it to the set.
        }
      }
    }
  }
  let res = [];
  for (let num of unique) res.push(num);
  return res.sort((a, b) => a - b);
};

// Two test cases
console.log(findEvenNumbers([2,1,3,0])) // [102,120,130,132,210,230,302,310,312,320]
console.log(findEvenNumbers([2,2,8,8,2])) // [222,228,282,288,822,828,882]