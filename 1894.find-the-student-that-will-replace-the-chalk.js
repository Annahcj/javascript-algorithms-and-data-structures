// 1894. Find the Student that Will Replace the Chalk
// There are n students in a class numbered from 0 to n - 1. The teacher will give each student a problem starting with the student number 0, then the student number 1, and so on until the teacher reaches the student number n - 1. After that, the teacher will restart the process, starting with the student number 0 again.
// You are given a 0-indexed integer array chalk and an integer k. There are initially k pieces of chalk. When the student number i is given a problem to solve, they will use chalk[i] pieces of chalk to solve that problem. However, if the current number of chalk pieces is strictly less than chalk[i], then the student number i will be asked to replace the chalk.
// Return the index of the student that will replace the chalk.


// Solution: Modulo

// If k is larger than the total sum of chalk, we can modulo k by the total sum.
// The result will be the same as using the original k.
// Then we can loop through chalk just once and find the first index where we don't have enough k.

// Time Complexity: O(n) 95ms
// Space Complexity: O(1) 52MB
var chalkReplacer = function(chalk, k) {
  let totalSum = chalk.reduce((memo, num) => memo + num);
  k = k % totalSum;
  for (let i = 0; i < chalk.length; i++) {
    if (chalk[i] > k) return i;
    k -= chalk[i];
  }
};

// Two test cases
console.log(chalkReplacer([5,1,5], 22)) // 0
console.log(chalkReplacer([3,4,1,2], 25)) // 1