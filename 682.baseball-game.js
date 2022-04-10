// 682. Baseball Game
// You are keeping score for a baseball game with strange rules. The game consists of several rounds, where the scores of past rounds may affect future rounds' scores.
// At the beginning of the game, you start with an empty record. You are given a list of strings ops, where ops[i] is the ith operation you must apply to the record and is one of the following:
  // An integer x - Record a new score of x.
  // "+" - Record a new score that is the sum of the previous two scores. It is guaranteed there will always be two previous scores.
  // "D" - Record a new score that is double the previous score. It is guaranteed there will always be a previous score.
  // "C" - Invalidate the previous score, removing it from the record. It is guaranteed there will always be a previous score.
// Return the sum of all the scores on the record.


// Solution: Stack
 
// Time Complexity: O(n) 81ms
// Space Complexity: O(n) 42.2MB
var calPoints = function(ops) {
  let stack = [];
  for (let op of ops) {
    if (op === '+') stack.push(stack[stack.length - 1] + stack[stack.length - 2]);
    else if (op === 'D') stack.push(stack[stack.length - 1] * 2);
    else if (op === 'C') stack.pop();
    else stack.push(+op);
  }
  return stack.reduce((acc, num) => acc + num);
};

// Two test cases to run function on
console.log(calPoints(["5","2","C","D","+"])) // 30
console.log(calPoints(["5","-2","4","C","D","9","+","+"])) // 27