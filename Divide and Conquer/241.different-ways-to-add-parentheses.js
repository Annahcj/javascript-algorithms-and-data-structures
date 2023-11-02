// 241. Different Ways to Add Parentheses
// Given a string expression of numbers and operators, return all possible results from computing all the different possible ways to group numbers and operators. You may return the answer in any order.


// Solution 1: Divide & Conquer

// keep an array res
// For each operator in expression (pointer = i)
  // split the expression into two:
  // let part1 be the result from diffWaysToCompute(expression.slice(0, i))
  // let part2 be the result from diffWaysToCompute(expression.slice(i + 1))
  // loop through each number in part1 (p1)
    // loop through each number in part2 (p2)
      // if expression[i] is +, push p1 + p2 to res
      // if expression[i] is -, push p1 - p2 to res
      // if expression[i] is *, push p1 * p2 to res
  // if res is empty, push in the expression converted to a number.
  // return res.

// Time Complexity: O(2^n) 80ms
// Space Complexity: O(2^n) 41.4MB
var diffWaysToCompute = function(expression) {
  let res = [];
  for (var i = 0; i < expression.length; i++) {
      let sign = expression[i];
      if (expression[i] === '+' || expression[i] === '-' || expression[i] === '*') {
        let part1 = diffWaysToCompute(expression.slice(0, i));
        let part2 = diffWaysToCompute(expression.slice(i + 1));
        for (var p1 of part1) {
          for (var p2 of part2) {
            if (sign === '+') res.push(p1 + p2);
            else if (sign === '-') res.push(p1 - p2);
            else res.push(p1 * p2);
          }
        } 
      }
    }
    if (!res.length) {
      res.push(+expression);
    }
    return res;
};

// Solution 2: Divide & Conquer w/ Memoization

// Same as solution 1, but we cache the results for each expression.

// n = number of operators in expression
// Time Complexity: O(n) 76ms
// Space Complexity: O(2^n) 40MB
var diffWaysToCompute = function(expression) {
  let memo = {};
  return calc(expression);
  function calc(exp) {
    let res = [];
    if (memo[exp] !== undefined) return memo[exp];
    for (var i = 0; i < exp.length; i++) {
      if (exp[i] === '+' || exp[i] === '-' || exp[i] === '*') {
        let part1 = calc(exp.slice(0, i));
        let part2 = calc(exp.slice(i + 1));
        let sign = exp[i];
        for (var p1 of part1) {
          for (var p2 of part2) {
            if (sign === '+') res.push(p1 + p2);
            else if (sign === '-') res.push(p1 - p2);
            else res.push(p1 * p2);
          }
        } 
      }
    }
    if (!res.length) {
      res.push(+exp);
    }
    memo[exp] = res;
    return res;
  }  
};

// Two test cases to run function on
console.log(diffWaysToCompute("2-1-1")) // [0,2]
console.log(diffWaysToCompute("2*3-4*5")) // [-34,-14,-10,-10,10]