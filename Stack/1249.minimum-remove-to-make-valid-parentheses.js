// 1249. Minimum Remove to Make Valid Parentheses
// Given a string s of '(' , ')' and lowercase English characters. 
// Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting parentheses string is valid and return any valid string.


// Solution: Two Passes w/ Counter

// Keep track of a counter which indicates the current balance of the parenthesis string.
// From left-to-right, remove closing brackets which don't have a corresponding opening bracket (when balance is 0).
// From right-to-left, remove opening brackets which don't have a corresponding closing bracket on the right (when balance is 0).

// Time Complexity: O(n) 88ms
// Space Complexity: O(n) 60.6MB
var minRemoveToMakeValid = function(s) {
  let n = s.length, balance = 0, arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(s[i]);
    if (s[i] === '(') {
      balance++;
    } else if (s[i] === ')') {
      balance--;
      if (balance < 0) {
        balance = 0;
        arr.pop();
      }
    } 
  }
  balance = 0;
  let res = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    res.push(arr[i]);
    if (arr[i] === ')') {
      balance++;
    } else if (arr[i] === '(') {
      balance--;
      if (balance < 0) {
        balance = 0;
        res.pop();
      }
    }
  }
  return res.reverse().join("");
};

// Four test cases 
console.log(minRemoveToMakeValid("lee(t(c)o)de)")) // "lee(t(c)o)de"
console.log(minRemoveToMakeValid("a)b(c)d")) // "ab(c)d"
console.log(minRemoveToMakeValid("(a(b(c)d)")) // "a(b(c)d)"
console.log(minRemoveToMakeValid("))((")) // "lee(t(c)o)de"