// 739. Daily Temperatures
// Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.


// Solution: Monotonic Stack

// Find the first larger number on the right of each temperatures[i].
// Maintain a monotonic increasing stack of temperatures, traversing temperatures from left to right.
// For each temperatures[i], pop the top of the stack while temperatures[i] < temperatures[stack[stack.length - 1]].
// For each index we pop off the stack, temperatures[i] is the first warmest temperature on the right of stack[stack.length - 1].

// Time Complexity: O(n) 210ms
// Space Complexity: O(n) 73.4MB
var dailyTemperatures = function(temperatures) {
  let n = temperatures.length, stack = [];
  let ans = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    while (stack.length && temperatures[stack[stack.length - 1]] < temperatures[i]) {
      let j = stack.pop();
      ans[j] = i - j;
    }
    stack.push(i);
  }
  return ans;
};
  
// Three test cases
console.log(dailyTemperatures([73,74,75,71,69,72,76,73])) // [1,1,4,2,1,1,0,0]
console.log(dailyTemperatures([30,40,50,60])) // [1,1,1,0]
console.log(dailyTemperatures([30,60,90])) // [1,1,0]