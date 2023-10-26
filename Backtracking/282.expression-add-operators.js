// 282. Expression Add Operators
// Given a string num that contains only digits and an integer target, return all possibilities to add the binary operators '+', '-', or '*' between the digits of num so that the resultant expression evaluates to the target value.


// Solution: Backtracking w/ Evaluating on the Fly

// Use backtracking to try all possible combinations
// set res (result) to [];
// call backtrack(0, "", 0, 0);
// return res.

// backtrack: (i (index in num), str (expression string), total (evaluation of current str), prev (the previous number, can be positive or negative))
  // base case: if i is equal to num.length, 
    // if total is equal to target (evaluation is equal to target), push str into res.
    // return.
  // (since each number can be more than one digit, we build up a number)
  // set tempNum to 0, numStr to ''
  // loop through from i to num.length (pointer = j)
    // if j is bigger than i and num[i] is '0', break. (skip leading zeros)
    // update tempNum to be tempNum * 10 + num[j]
    // update numStr to be numStr + num[j]

    // (now, the four backtracking situations)
    // (1. it's the first number)
    // call backtrack(j + 1, numStr, tempNum, tempNum)

    // (2. addition)
    // call backtrack(j + 1, str + '+' + numStr, total + tempNum, tempNum)

    // (3. subtraction)
    // call backtrack(j + 1, str + '-' + numStr, total - tempNum, -tempNum)

    // (4. multiplication)
    // call backtrack(j + 1, str + '*' + numStr, total - prev + prev * tempNum, prev * tempNum)
    // (total - prev + prev * tempNum -> 
      // (total - prev): to bring it back to previous state without previous number
      // (+ prev * tempNum): then add on previous number * tempNum

// Time Complexity: O(n * 4^n) 124ms
// Space Complexity: O(n) (call stack) 45.9MB
var addOperators = function(num, target) {
  let res = [];
  backtrack(0, "", 0, 0);
  return res;
  function backtrack(i, str, total, prev) {
    if (i === num.length) {
      if (total === target) res.push(str);
      return;
    }
    let tempNum = 0, numStr = '';
    for (var j = i; j < num.length; j++) {
      if (j > i && num[i] === '0') break; 
      tempNum = tempNum * 10 + +num[j];
      numStr += num[j];

      if (i === 0) {
        backtrack(j + 1, numStr, tempNum, tempNum);
      } else {
        backtrack(j + 1, str + '+' + numStr, total + tempNum, tempNum);
        backtrack(j + 1, str + '-' + numStr, total - tempNum, -tempNum);
        backtrack(j + 1, str + '*' + numStr, total - prev + prev * tempNum, prev * tempNum);
      }
    }
  }
};

// Five test cases to run function on
console.log(addOperators("123", 6)) // ["1*2*3","1+2+3"]
console.log(addOperators("232", 8)) // ["2*3+2","2+3*2"]
console.log(addOperators("105", 5)) // ["1*0+5","10-5"]
console.log(addOperators("00", 0)) // ["0*0","0+0","0-0"]
console.log(addOperators("3456237490", 9191)) // []