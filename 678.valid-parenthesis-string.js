// 678. Valid Parenthesis String
// Given a string s containing only three types of characters: '(', ')' and '*', return true if s is valid.
// The following rules define a valid string:
  // Any left parenthesis '(' must have a corresponding right parenthesis ')'.
  // Any right parenthesis ')' must have a corresponding left parenthesis '('.
  // Left parenthesis '(' must go before the corresponding right parenthesis ')'.
  // '*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string "".


// Solution: Recursion w/ Memoization

// ( : subtract 1
// ) : add 1
// * : subtract 1, add 1, or leave it as it is.

// Memoize the results in a hashmap.

// Time Complexity: O(n^2) 150ms -> n * balance: balance will be n in the worst case.
// Space Complexity: O(n^2) 43.2MB
var checkValidString = function(s) {
  let memo = {};
  return recurse(0, 0);
  
  function recurse(idx, balance) {
    if (idx === s.length) {
      return balance === 0;
    }
    if (balance > 0) return false; // in a situation like ')))', where it is definitely invalid.
    if (memo[`${idx},${balance}`] !== undefined) return memo[`${idx},${balance}`];
    
    if (s[idx] === '(') return memo[`${idx},${balance}`] = recurse(idx + 1, balance - 1);
    else if (s[idx] === ')') return memo[`${idx},${balance}`] = recurse(idx + 1, balance + 1);
    else {
      return memo[`${idx},${balance}`] = recurse(idx + 1, balance) || recurse(idx + 1, balance - 1) || recurse(idx + 1, balance + 1);
    }
  }  
};

// Three test cases to run function on
console.log(checkValidString("()")) // true
console.log(checkValidString("(*)")) // true
console.log(checkValidString("(*))")) // true