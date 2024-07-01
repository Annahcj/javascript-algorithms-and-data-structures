// 1550. Three Consecutive Odds
// Given an integer array arr, return true if there are three consecutive odd numbers in the array. Otherwise, return false.


// Solution: Counting

// Count the consecutive odd numbers and return true if the count reaches 3.

// Time Complexity: O(n) 49ms
// Space Complexity: O(1) 48.7MB
var threeConsecutiveOdds = function(arr) {
  let odd = 0;
  for (let num of arr) {
    if (num % 2 === 1) odd++;
    else odd = 0;
    if (odd === 3) return true;
  }
  return false;
};

// Two test cases
console.log(threeConsecutiveOdds([2,6,4,1])) // false
console.log(threeConsecutiveOdds([1,2,34,3,4,5,7,23,12])) // true