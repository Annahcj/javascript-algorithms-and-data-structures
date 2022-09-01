// 1106. Parsing A Boolean Expression
// Return the result of evaluating a given boolean expression, represented as a string.
// An expression can either be:
  // "t", evaluating to True;
  // "f", evaluating to False;
  // "!(expr)", evaluating to the logical NOT of the inner expression expr;
  // "&(expr1,expr2,...)", evaluating to the logical AND of 2 or more inner expressions expr1, expr2, ...;
  // "|(expr1,expr2,...)", evaluating to the logical OR of 2 or more inner expressions expr1, expr2, ...


// Solution: Recursion

// When we get a '!', '|', or '&', call recurse.
  // Each expression ends at ')'.
  // Return the result of the expression and the next index (index of ')').
  // We can then skip to the next index to avoid revisiting the expression again.

// An expression can either be 't'/'f' or an expression that starts with '!', '|', or '&'.

// Time Complexity: O(n) 122ms
// Space Complexity: O(n) 45.8MB
var parseBoolExpr = function(expression) {
  let n = expression.length;
  let [res] = recurse(0);
  return res;
  
  function recurse(start) {
    let logic = expression[start];
    let hasTrue = false, hasFalse = false;
    for (let i = start + 1; i < n; i++) {
      if (isLogic(expression[i])) {
        let [res, nextIndex] = recurse(i);
        i = nextIndex;
        
        if (res) hasTrue = true;
        else hasFalse = true;
        
      } else if (isBoolean(expression[i])) {
        if (expression[i] === 't') hasTrue = true;
        else hasFalse = true;
      } else if (expression[i] === ')') { // end of an expression
        return [getResult(logic, hasTrue, hasFalse), i];
      }
    }
  }  
  
  function isLogic(char) {
    let logic = ['!', '|', '&'];
    return logic.includes(char);
  }
    
  function isBoolean(char) {
    return char === 't' || char === 'f';
  }
  
  function getResult(logic, hasTrue, hasFalse) {
    if (logic === '!') return !hasTrue;
    if (logic === '|') return hasTrue;
    return !hasFalse;
  }
};

// Four test cases to run function on
console.log(parseBoolExpr("!(f)")) // true
console.log(parseBoolExpr("|(f,t)")) // true
console.log(parseBoolExpr("&(t,f)")) // false
console.log(parseBoolExpr("&(|(t,f),f)")) // false