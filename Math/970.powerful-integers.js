// 970. Powerful Integers
// Given three integers x, y, and bound, return a list of all the powerful integers that have a value less than or equal to bound.
// An integer is powerful if it can be represented as xi + yj for some integers i >= 0 and j >= 0.
// You may return the answer in any order. In your answer, each value should occur at most once.


// Solution: Brute Force

// Go through every i for x^i
  // Go through every j for y^j while x^i + y^j <= bound.
// Store the integers in a hashset to eliminate duplicates.

// In the worst case x = 2, we will go through at most up to 2^20, which is 20 iterations.
// So the maximum time complexity is 20 * 20 since bound <= 10^6.

// One special case to handle is when x or y is 1.
// In this case we only need one iteration for x or y because x^i will not change regardless how i (1^1 = 1, 1^5 = 1)

// Time Complexity: O(20 * 20) 109ms
// Space Complexity: O(20 * 20) 41.6MB
var powerfulIntegers = function(x, y, bound) {
  let powerful = new Set();
  let i = 0;
  while (x ** i <= bound) {
    let j = 0;
    while (x ** i + y ** j <= bound) {
      powerful.add(x ** i + y ** j);
      if (y === 1) break;
      j++;
    }
    if (x === 1) break;
    i++;
  }
  return [...powerful];
};

// Two test cases
console.log(powerfulIntegers(2, 3, 10)) // [2,3,4,5,7,9,10]
console.log(powerfulIntegers(3, 5, 15)) // [2,4,6,8,10,14]