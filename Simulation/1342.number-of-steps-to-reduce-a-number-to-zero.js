// 1342. Number of Steps to Reduce a Number to Zero
// Given an integer num, return the number of steps to reduce it to zero.
// In one step, if the current number is even, you have to divide it by 2, otherwise, you have to subtract 1 from it.


// Solution: Simulation

// Time Complexity: O(log(n)) 67ms
// Space Complexity: O(1) 42.3MB
var numberOfSteps = function(num) {
  let steps = 0;
  while (num > 0) {
    if (num % 2 === 1) num--;
    else num /= 2;
    steps++;
  }  
  return steps;
};

// Three test cases 
console.log(numberOfSteps(14)) // 6
console.log(numberOfSteps(8)) // 4
console.log(numberOfSteps(123)) // 12