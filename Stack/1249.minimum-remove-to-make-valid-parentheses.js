// 1249. Minimum Remove to Make Valid Parentheses
// Given a string s of '(' , ')' and lowercase English characters. 
// Your task is to remove the minimum number of parentheses ( '(' or ')', in any positions ) so that the resulting parentheses string is valid and return any valid string.


// Solution: Stack

// Loop through s (pointer = i),
  // If s[i] is a '(', push the index (i) into the stack
  // Else if s[i] is a ')', 
    // If stack is empty, that means s[i] is an invalid parenthesis, so we push i into a seperate array 'toRemove'.
    // Else, pop the last item off stack.
// When iteration is done, we now have the indexes of parentheses that we need to remove.
// Loop through stack and push each index into 'toRemove'.
// Loop through s (pointer = h), also keeping a pointer r to indicate where we are in toRemove.
  // If h is equal to index in toRemove (toRemove[r]), increment r. 
  // Else, add s[h] to result.
// When iteration is done, return result.

// Time Complexity: O(n) 96ms
// Space Complexity: O(n) 46.4MB
var minRemoveToMakeValid = function(s) {
  let stack = [], toRemove = [], result = '';
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(i);
    } else if (s[i] === ')') {
      if (!stack.length) {
        toRemove.push(i);
      } else {
        stack.pop();
      }
    }
  }
  for (let j = 0; j < stack.length; j++) toRemove.push(stack[j]);
  let r = 0;
  for (let h = 0; h < s.length; h++) {
    if (h === toRemove[r]) {
      if (r < toRemove.length - 1) r++;
    } else {
      result += s[h];
    }
  }
  return result;
};

// Four test cases 
console.log(minRemoveToMakeValid("lee(t(c)o)de)")) // "lee(t(c)o)de"
console.log(minRemoveToMakeValid("a)b(c)d")) // "ab(c)d"
console.log(minRemoveToMakeValid("(a(b(c)d)")) // "a(b(c)d)"
console.log(minRemoveToMakeValid("))((")) // "lee(t(c)o)de"