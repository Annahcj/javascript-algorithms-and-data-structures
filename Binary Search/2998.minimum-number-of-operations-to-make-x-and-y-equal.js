// 2998. Minimum Number of Operations to Make X and Y Equal
// You are given two positive integers x and y.
// In one operation, you can do one of the four following operations:
  // Divide x by 11 if x is a multiple of 11.
  // Divide x by 5 if x is a multiple of 5.
  // Decrement x by 1.
  // Increment x by 1.
// Return the minimum number of operations required to make x and y equal.


// Solution: BFS

// Rough upper bound for x is 50k (5 times the max value of y).
// Lower bound: When x is less than y, there is no point decrementing it.

// Use BFS to find the minimum steps to reach each possible state within the bounds.
// At each state, try each of the four operations if we haven't been to the new state before.

// m = upper bound (5 * max(x, y))
// Time Complexity: O(5m) 85ms
// Space Complexity: O(5m) 49.2MB
var minimumOperationsToMakeEqual = function(x, y) {
  if (x <= y) return y - x;
  let seen = new Set([x]), queue = [x];
  let steps = 0, UPPER_BOUND = 5 * Math.max(x, y);
  while (queue.length) {
    for (let i = queue.length - 1; i >= 0; i--) {
      let num = queue.shift();
      if (num === y) return steps;
      
      let nextStates = [];
      if (num > y) {
        if (num % 11 === 0) nextStates.push(num / 11);
        if (num % 5 === 0) {
          nextStates.push(num / 5);
        }
        nextStates.push(num - 1);
      }
      if (num < UPPER_BOUND) {
        nextStates.push(num + 1);
      }
      
      for (let nextState of nextStates) {
        if (!seen.has(nextState)) {
          seen.add(nextState);
          queue.push(nextState);
        }
      }
    }
    steps++;
  }
};

// Two test cases
console.log(minimumOperationsToMakeEqual(26, 1)) // 3
console.log(minimumOperationsToMakeEqual(54, 2)) // 4
console.log(minimumOperationsToMakeEqual(25, 30)) // 5