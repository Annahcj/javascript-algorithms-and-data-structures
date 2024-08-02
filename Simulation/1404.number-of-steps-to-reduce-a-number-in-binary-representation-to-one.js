// 1404. Number of Steps to Reduce a Number in Binary Representation to One
// Given the binary representation of an integer as a string s, return the number of steps to reduce it to 1 under the following rules:
  // If the current number is even, you have to divide it by 2.
  // If the current number is odd, you have to add 1 to it.
// It is guaranteed that you can always reach one for all test cases.


// Solution: Simulation

// A number is even if the rightmost bit is 1.
// Simulate the steps until the number becomes 1.
// If the rightmost bit is 0: pop off the rightmost bit (essentially shifting all bits to the right by 1 position).
// If the rightmost bit is 1: Traverse from right to left while bits are all 1, when we find the first 0 or reach the start of the array, turn it into 1 and all elements on the right to 0.

// Time Complexity: O(n^2) 54ms
// Space Complexity: O(n) 49.1MB
var numSteps = function(s) {
  let bits = s.split(""), steps = 0;
  while (bits.length > 1 || bits[0] !== '1') {
    if (bits[bits.length - 1] === '0') {
      bits.pop();
    } else {
      let i = bits.length - 1;
      while (i >= 0 && bits[i] === '1') {
        bits[i] = '0';
        i--;
      }
      if (i < 0) {
        bits.unshift('1');
      } else {
        bits[i] = '1';
      }
    }
    steps++;
  }
  return steps;
};

// Three test cases
console.log(numSteps("1101")) // 6
console.log(numSteps("10")) // 1
console.log(numSteps("1")) // 0